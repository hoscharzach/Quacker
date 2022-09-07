import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getSinglePost } from "../../store/posts"
import PostFeed from "../postfeed/PostFeed"
import { nanoid } from 'nanoid'
import CreatePostModal from "../CreatePostModal"
import './singlepost.css'

export default function SinglePost() {
    const { postId, username } = useParams()

    // listen for changes in state posts
    const selectAllPosts = useSelector(state => state.posts.normPosts)
    const mainPost = useSelector(state => state.posts.normPosts[postId])

    // const parentPost = useSelector(state => state.normPosts[mainPost?.inReplyTo])


    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    const [replies, setReplies] = useState([])
    const [parentPost, setParentPost] = useState(null)

    useEffect(() => {
        if (mainPost) {
            setReplies(mainPost.replies)
            if (mainPost.parent) {
                setParentPost(mainPost.parent)
            } else {
                setParentPost(null)
            }
        }
        console.log("MAIN POST", mainPost)
        console.log("PARENT POST", parentPost)
    }, [mainPost, postId, username])

    useEffect(() => {
        const x = document.getElementById('main-post')
        console.log(x, "MAIN POST")
        window.scrollTo(0, 0)
    }, [mainPost, parentPost])

    useEffect(() => {
        setErrors([])
        if (!mainPost) {
            (async () => {
                await dispatch(getSinglePost(postId))
                    .then(data => {
                        setLoaded(true)
                    })
                    .catch(data => {
                        if (data.status === 404) setErrors(['NOT FOUND'])
                        setLoaded(true)
                    })
            })();
        } else {
            setLoaded(true)
        }
    }, [postId, username, dispatch])

    if (!loaded) return null

    return (
        <div id="single-post-component-wrapper">
            <>
                {errors.length > 0 &&
                    errors.map(el => (
                        <p key={nanoid()}>{el}</p>
                    ))}
            </>
            {loaded && parentPost &&
                <article id="parent-post">
                    <h3>{parentPost.user.username}'s parentPost with id <strong>{parentPost.id}</strong> made on {parentPost.createdAt}</h3>
                    <p>Content: {parentPost.content}</p>
                    <p>Number of Replies {parentPost.numReplies}</p>
                    {parentPost.inReplyTo &&
                        <p>In Reply to parentPost <Link to={`/profile/${parentPost.user.username}/post/${parentPost.inReplyTo}`}>{parentPost.inReplyTo}</Link></p>}
                    {parentPost.images &&
                        parentPost.images.map(el => (
                            <img key={el.id} alt="" src={el.url}></img>
                        ))}
                    <CreatePostModal parentId={parentPost.id} />
                </article>

            }

            {loaded && mainPost &&
                <>
                    <article id="main-post">
                        <h3>{mainPost.user.username}'s mainPost with id <strong>{mainPost.id}</strong> made on {mainPost.createdAt}</h3>
                        <p>Content: {mainPost.content}</p>
                        <p>Number of Replies {mainPost.numReplies}</p>
                        {mainPost.inReplyTo &&
                            <p>In Reply to mainPost <Link to={`/profile/${mainPost.user.username}/post/${mainPost.inReplyTo}`}>{mainPost.inReplyTo}</Link></p>}
                        {mainPost.images &&
                            mainPost.images.map(el => (
                                <img key={el.id} alt="" src={el.url}></img>
                            ))}
                        <CreatePostModal parentId={mainPost.id} />
                    </article>
                    <PostFeed posts={replies} />
                </>
            }
        </div>




    )
}
