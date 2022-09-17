import { useEffect, useRef, useState, React } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { getSinglePost } from "../../store/posts"
import './singlepost.css'
import MainPost from "../MainPostCard/MainPost"
import backbutton from '../../images/backbutton.svg'
import ParentCard from "../ParentCard/ParentCard"
import ReplyCard from "../ReplyCard/ReplyCard"

export default function SinglePost() {

    // const mainView = useRef(null)

    const { postId, username } = useParams()
    const history = useHistory()

    // const allPosts = useSelector(state => state.normPosts)
    const mainPost = useSelector(state => state.posts.normPosts[postId])
    const parentPost = useSelector(state => state.posts.normPosts[mainPost?.inReplyTo])
    const replies = useSelector(state => state.posts.normPosts[postId]?.replies)

    const dispatch = useDispatch()

    const [mainPostLoaded, setMainPostLoaded] = useState(false)
    const [restLoaded, setRestLoaded] = useState(false)
    const [errors, setErrors] = useState('')

    useEffect(() => {
        const centerPost = document.getElementsByClassName("main-post-container")[0]
        if (centerPost) {
            centerPost.scrollIntoView()
            // window.scrollTo({ top: centerPost.scrollHeight })
        }
    }, [mainPostLoaded, mainPost])

    // if the post isn't in state, or it doesn't have the replies property (meaning it was initially loaded as a parent) then fetch the post and all of its replies and set state to loaded
    useEffect(() => {
        (async () => {
            setErrors('')

            if (Number.isNaN(Number(postId))) {
                setErrors('404 Resource Not Found')
                setMainPostLoaded(true)
                setRestLoaded(true)
                return
            }

            // console.log(mainPost.replies)

            if (!mainPost) {
                await dispatch(getSinglePost(postId))
                    .then(a => {
                        setMainPostLoaded(true)
                        setRestLoaded(true)
                    })
                    .catch(a => {
                        setErrors('404 Resource Not Found')
                        setMainPostLoaded(true)
                    })
            }

            else if (mainPost && mainPost.replies === undefined) {
                setMainPostLoaded(true)
                await dispatch(getSinglePost(postId))
                    .then(a => setRestLoaded(true))
                    .catch(a => console.log("AN ERROR OCURRED"))
            }


            else if (mainPost && mainPost.replies !== undefined) {
                setMainPostLoaded(true)
                setRestLoaded(true)
            }

        })();
    }, [postId, username, dispatch, mainPost])

    console.log(mainPost)

    if (!mainPostLoaded) return null

    return (
        <>
            <div className="center-column">
                <div className="title-container">
                    <button className="back-button" onClick={() => history.goBack()}><img src={backbutton} alt="" ></img></button>
                    <div>Quack</div>
                </div>
                {mainPostLoaded && errors.length > 0 &&
                    <div style={{ height: '300px', display: 'flex', borderBottom: '1px solid rgb(66, 83, 100)', alignItems: 'center', padding: '0px 10px' }} >
                        <h3>Post couldn't be found, check out the <Link to={'/home'}><span style={{ color: 'rgb(29, 155, 240)' }} >main feed</span></Link>, or refresh the page to try again.</h3>
                    </div>
                }

                {mainPostLoaded && parentPost &&
                    <ParentCard postId={parentPost.id} />}

                {mainPostLoaded &&
                    <MainPost parentId={mainPost.inReplyTo || null} postId={mainPost.id} />
                }

                {mainPostLoaded && restLoaded && replies &&
                    <>
                        <div className="replies-container">
                            {replies.map(reply => (
                                <ReplyCard key={reply.id} replyId={reply.id} reply={reply} />
                            ))}
                        </div>
                    </>}


            </div>
        </>




    )
}
