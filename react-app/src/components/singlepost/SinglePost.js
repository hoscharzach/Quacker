import { useEffect, useRef, useState, React } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect, useHistory, useParams } from "react-router-dom"
import { getSinglePost } from "../../store/posts"
import './singlepost.css'
import MainPost from "../MainPostCard/MainPost"
import backbutton from '../../images/backbutton.svg'
import ParentCard from "../ParentCard/ParentCard"
import ReplyCard from "../ReplyCard/ReplyCard"
import Loading from "../Loading"

export default function SinglePost() {

    const { postId } = useParams()
    const history = useHistory()

    const mainPost = useSelector(state => state.posts.normPosts[postId])
    const parentPost = useSelector(state => state.posts.normPosts[mainPost?.inReplyTo])
    const selectPosts = useSelector(state => state.posts.normPosts)

    const dispatch = useDispatch()

    const [mainPostLoaded, setMainPostLoaded] = useState(false)
    const [restLoaded, setRestLoaded] = useState(false)
    const [errors, setErrors] = useState('')

    useEffect(() => {

        // janky way to scroll the parent post out of the way but it works
        const topOfPost = document.getElementsByClassName("main-post-container")[0]
        if (topOfPost) {
            topOfPost.scrollIntoView()
            window.scrollBy(0, -50)
        } else {
            window.scrollTo({ top: 0 })
        }
    }, [parentPost?.id, mainPost?.id, postId])


    useEffect(() => {
        (async () => {
            setErrors('')

            if (!mainPost && mainPostLoaded) return

            if (Number.isNaN(Number(postId))) {
                setErrors('404 Resource Not Found')
                setMainPostLoaded(true)
                setRestLoaded(true)
                return
            }

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
                    .catch(a => alert("AN ERROR OCURRED"))
            }

            else if (mainPost && mainPost.replies !== undefined) {
                setMainPostLoaded(true)
                setRestLoaded(true)
            }
            setMainPostLoaded(true)
            setRestLoaded(true)

        })();
    }, [postId, dispatch, mainPost])

    if (mainPostLoaded && !mainPost) return <Redirect to={'/home'} />

    return (
        <>
            <div className="center-column">
                <div className="title-container" style={{
                    zIndex: '998',
                    backgroundColor: '#15202b',
                    // opacity: '.9',
                    position: 'sticky',
                    top: '0',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '15px',
                    boxSizing: 'border-box',
                    width: '650px',
                    height: '50px',
                    opacity: '.9',
                    fontWeight: 700
                    // borderTop: '1px solid rgb(66, 83, 100)',
                    // borderBottom: '1px solid rgb(66, 83, 100)'
                }}>
                    <button className="back-button" onClick={() => history.push(mainPost?.inReplyTo ? `/post/${mainPost.inReplyTo}` : '/home')}><img src={backbutton} alt="" ></img></button>
                    <div className="scroll-top-button" style={{ paddingLeft: '10px', flexGrow: 1 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >Quack</div>
                </div>
                {mainPostLoaded && errors.length > 0 &&
                    <div style={{ height: '300px', display: 'flex', borderBottom: '1px solid rgb(66, 83, 100)', alignItems: 'center', padding: '0px 10px' }} >
                        <h3>Post couldn't be found, check out the <Link to={'/home'}><span style={{ color: 'rgb(29, 155, 240)' }} >main feed</span></Link>, or refresh the page to try again.</h3>
                    </div>
                }

                {mainPostLoaded && mainPost.parent &&
                    <ParentCard post={mainPost.parent} />}

                {mainPostLoaded && mainPost &&
                    <MainPost parentId={mainPost.inReplyTo || null} postId={mainPost.id} />
                }

                {mainPostLoaded &&
                    <>
                        <div className="replies-container">
                            {!restLoaded &&
                                <Loading />}
                            {restLoaded && selectPosts &&
                                Object.values(selectPosts).filter(post => post.inReplyTo && post.inReplyTo == postId).map(reply => (
                                    <ReplyCard key={reply.id} replyId={reply.id} reply={reply} />
                                ))}
                        </div>
                    </>}
                <div style={{ height: '100vh' }}></div>

            </div>
        </>




    )
}
