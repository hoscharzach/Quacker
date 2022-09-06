import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getSinglePost } from "../../store/posts"
import PostFeed from "../postfeed/PostFeed"
import { nanoid } from 'nanoid'
import CreatePostModal from "../CreatePostModal"

export default function SinglePost() {
    const { postId, username } = useParams()

    // listen for changes in state post
    const selectPosts = useSelector(state => state.posts.normPosts)
    const parentPost = selectPosts[postId]?.inReplyTo
    const mainPost = selectPosts[postId]
    const replies = mainPost?.replies

    const dispatch = useDispatch()



    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState([])
    console.log(replies)


    useEffect(() => {
        setErrors([])
        console.log(!mainPost, mainPost, !(parentPost?.hasOwnProperty('replies')), "!mainPost and mainPost and replies in main post")
        if (!mainPost || !mainPost.hasOwnProperty.call(mainPost, 'replies')) {
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
        <div className="single-post-component-wrapper">
            <>
                {errors.length > 0 &&
                    errors.map(el => (
                        <p key={nanoid()}>{el}</p>
                    ))}
            </>

            {loaded && mainPost &&
                <>
                    <article className="main-post">
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
                    {replies && <PostFeed posts={replies} />}
                </>
            }
        </div>




    )
}
