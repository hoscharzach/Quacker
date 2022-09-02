import { useParams } from "react-router-dom"

export default function SinglePost() {
    const { postId, username } = useParams()
    return (
        <>
            {username}'s profile and {postId}
        </>
    )
}
