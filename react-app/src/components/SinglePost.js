import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function SinglePost() {
    const { postId, username } = useParams()

    const [loaded, setLoaded] = useState(false)
    const [post, setPost] = useState()


    useEffect(() => {
        (async () => {
            await fetch(`/api/posts/${postId}`)
                .then(data => data.json())
                .then(data => {
                    setPost(data.post)
                    setLoaded(true)
                })
            setLoaded(true);
        })();
    }, [postId, username])
    return (
        <>

            {username}'s profile and {postId}
            <Link to={`/profile/marnie/post/${7}`}>Hey</Link>
            {loaded &&
                <>
                    <div className="single-post-main-container">
                        <p>{post.content}</p>
                    </div>
                    <div className="comments">
                        <h3>Comments</h3>
                        {post.replies.map(el => (
                            <>
                                <Link to={`/profile/${el.user.username}/post/${el.id}`}>Check out this post</Link>
                                <p key={el.id}>{el.content}</p>
                            </>
                        ))}
                    </div>
                </>
            }
        </>
    )
}
