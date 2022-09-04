import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getSinglePost } from "../../store/posts"
import PostFeed from "../postfeed/PostFeed"

export default function SinglePost() {
    const selectNormalizedPosts = useSelector(state => state.posts.normPosts)
    const { postId, username } = useParams()

    console.log(selectNormalizedPosts, "NORMALIZED POSTS")

    const dispatch = useDispatch()

    const [post, setPost] = useState(null)
    // const [errors, setErrors] = useState([])
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        if (!selectNormalizedPosts[postId]) {
            (async () => {
                await dispatch(getSinglePost(postId))
                setFetched(true)
            })();
        } else {
            setPost(selectNormalizedPosts[postId])
        }

    }, [postId, username, dispatch])

    useEffect(() => {
        selectNormalizedPosts[postId] ? setPost(selectNormalizedPosts[postId]) : setPost(null)
    }, [fetched])

    if (!post) return null

    return (
        <div className="single-post-component-wrapper">
            {post &&
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
                    </article>
                    <PostFeed posts={post.replies} />
                </>
            }
        </div>




    )
}
