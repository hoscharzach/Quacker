import { useSelector } from "react-redux"

export default function FollowCard({ username }) {
    const selectUser = useSelector(state => state.posts.users[username])
    return (
        <div>{selectUser && selectUser.username}</div>
    )
}