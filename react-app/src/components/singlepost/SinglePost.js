import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getSinglePost } from "../../store/posts"
import PostFeed from "../postfeed/PostFeed"
import { nanoid } from 'nanoid'
import CreatePostModal from "../../CreatePostModal"

export default function SinglePost() {
    const { postId, username } = useParams()

    // listen for changes in state posts
    const selectNormalizedPosts = useSelector(state => state.posts.normPosts)

    console.log("STATE POSTS", selectNormalizedPosts)
    const dispatch = useDispatch()



    const [loaded, setLoaded] = useState(false)
    const [post, setPost] = useState(selectNormalizedPosts[postId])
    const [fetched, setFetched] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setErrors([])
        if (!post) {
            (async () => {
                await dispatch(getSinglePost(postId))
                    .then(data => {
                        setFetched(true)
                        setPost(data)
                    })
                    .catch(data => {
                        if (data.status === 404) setErrors(['NOT FOUND'])
                        setLoaded(true)
                    })
            })();
        } else {
            setPost(selectNormalizedPosts[postId])
            setLoaded(true)
        }

    }, [postId, username, post, dispatch])

    console.log(errors)

    // useEffect(() => {
    //     if (fetched && post) setLoaded(true)
    // }, [post, fetched])



    // useEffect(() => {
    //     setErrors([])
    //     if (selectNormalizedPostById && fetched) {
    //         setPost(selectNormalizedPostById)
    //         setLoaded(true)
    //     } else {
    //         setErrors(['Post does not exist'])
    //         setLoaded(true)
    //     }

    // }, [fetched, post])

    if (!loaded) return null

    return (
        <div className="single-post-component-wrapper">
            <>
                {errors.length > 0 &&
                    errors.map(el => (
                        <p key={nanoid()}>{el}</p>
                    ))}
            </>
            {loaded && post &&
                <>
                    <article className="parent-post">
                        <h3>{post.user.username}'s post with id <strong>{post.id}</strong> made on {post.createdAt}</h3>
                        <p>Content: {post.content}</p>
                        <p>Number of Replies {post.numReplies}</p>
                        {post.inReplyTo &&
                            <p>In Reply to post <Link to={`/profile/${post.user.username}/post/${post.inReplyTo}`}>{post.inReplyTo}</Link></p>}
                        {post.images &&
                            post.images.map(el => (
                                <img key={el.id} alt="" src={el.url}></img>
                            ))}
                        <CreatePostModal parentId={post.id} />
                    </article>
                    <PostFeed posts={post.replies} />
                </>
            }
        </div>




    )
}
