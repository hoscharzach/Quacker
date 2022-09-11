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

    const allPosts = useSelector(state => state.normPosts)
    const mainPost = useSelector(state => state.posts.normPosts[postId])
    const parentPost = useSelector(state => state.posts.normPosts[mainPost?.inReplyTo])

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [mainPost])

    // if the post isn't in state, or it doesn't have the replies property (meaning it was initially loaded as a parent) then fetch the post and all of its replies and set state to loaded
    useEffect(() => {
        (async () => {
            setErrors('')
            if (!mainPost) {
                const response = await fetch(`/api/posts/${postId}/parent`)
                if (response.ok) {
                    const data = await response.json()
                    if (data.hasParent) {
                        await dispatch(getSinglePost(data.parent))
                        setLoaded(true)
                    } else {
                        await dispatch(getSinglePost(postId))
                        setLoaded(true)
                    }
                } else {
                    setErrors('404 Resource Not Found')
                    setLoaded(true)
                }
            } else {
                setLoaded(true)
            }
        })();
    }, [postId, username, dispatch, mainPost])

    if (!loaded) return null

    return (
        <>
            <div className="center-column">
                <div className="title-container">
                    <button className="back-button" onClick={() => history.goBack()}><img src={backbutton} alt="" ></img></button>
                    <div>Quack</div>
                </div>
                {loaded && errors.length > 0 &&
                    <div style={{ height: '300px', display: 'flex', borderBottom: '1px solid white', alignItems: 'center', padding: '0px 10px' }} >
                        <h3>Post couldn't be found, check out the <Link to={'/home'}><span style={{ color: 'rgb(29, 155, 240)' }} >main feed</span></Link>, or refresh the page to try again.</h3>
                    </div>
                }

                {loaded && mainPost && parentPost &&
                    <ParentCard postId={parentPost.id} />}

                {loaded && mainPost &&
                    <>
                        <MainPost parentId={mainPost.inReplyTo || null} postId={mainPost.id} />

                        <div className="replies-container">
                            {mainPost.replies.reverse().map(reply => (
                                <ReplyCard key={reply.id} replyId={reply.id} />
                            ))}
                        </div>
                    </>
                }

            </div>
        </>




    )
}
