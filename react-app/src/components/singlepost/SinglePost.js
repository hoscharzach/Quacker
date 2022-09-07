import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getSinglePost } from "../../store/posts"
import PostFeed from "../postfeed/PostFeed"
import { nanoid } from 'nanoid'
import CreatePostModal from "../CreatePostModal"
import './singlepost.css'
import Cards from "../Cards"

export default function SinglePost() {
    const { postId, username } = useParams()

    // listen for changes in state posts
    // const selectAllPosts = useSelector(state => state.posts.normPosts)
    const mainPost = useSelector(state => state.posts.normPosts[postId])


    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState('')
    const [hasParent, setHasParent] = useState(false)

    // if the post isn't in state, or it doesn't have the replies property (meaning it was initially loaded as a parent) then fetch the post and all of its replies and set state to loaded
    useEffect(() => {
        (async () => {
            setErrors('')
            if (!mainPost) {
                const response = await fetch(`/api/posts/${postId}/parent`)
                if (response.ok) {
                    const data = await response.json()
                    console.log(data, "DATA INSIDE USEEFFECT FOR SINGLE POST")
                    if (data.hasParent) {
                        await dispatch(getSinglePost(data.parent))
                        setLoaded(true)
                    } else {
                        await dispatch(getSinglePost(postId))
                        setLoaded(true)
                    }
                } else {
                    setErrors('POST NOT FOUND')
                    setLoaded(true)
                }
            } else {
                setLoaded(true)
            }
        })();
    }, [postId, username, dispatch])

    if (!loaded) return null

    return (
        <div id="single-post-component-wrapper">
            {loaded && errors.length > 0 &&
                <h1>{errors}</h1>
            }
            {loaded && mainPost && mainPost.parent &&
                <article id="parent-post">
                    <h3>{mainPost.parent.user.username}'s mainPost.parent with id <strong>{mainPost.parent.id}</strong> made on {mainPost.parent.createdAt}</h3>
                    <p>Content: {mainPost.parent.content}</p>
                    <p>Number of Replies {mainPost.parent.numReplies}</p>
                    {mainPost.parent.inReplyTo &&
                        <p>In Reply to mainPost.parent <Link to={`/profile/${mainPost.parent.user.username}/post/${mainPost.parent.inReplyTo}`}>{mainPost.parent.inReplyTo}</Link></p>}
                    {mainPost.parent.images &&
                        mainPost.parent.images.map(el => (
                            <img key={el.id} alt="" src={el.url}></img>
                        ))}
                    <CreatePostModal parentId={mainPost.parent.id} />
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
                    <div className="replies-container">
                        {mainPost?.replies && mainPost.replies.map(el => (
                            <Cards key={el.id} postId={el.id} />
                        ))}
                    </div>
                </>
            }
        </div>




    )
}
