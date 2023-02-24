import { set } from "date-fns"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserPosts } from "../../store/posts"
import Loading from "../Loading"


export default function FollowCard({ username }) {
    const dispatch = useDispatch()
    const selectUser = useSelector(state => state.posts.users[username])

    const [postsLoaded, setPostsLoaded] = useState(false)
    useEffect(() => {
        setPostsLoaded(false)
        if (!selectUser) {
            dispatch(getUserPosts(username, 'quacks'))
                .then(data => {
                    setPostsLoaded(true)
                })
                .catch(data => {
                    window.alert("Error")
                })
        }
        setPostsLoaded(true)
    }, [selectUser])
    console.log(selectUser)
    return (
        <>
            {!postsLoaded ? <Loading /> : <div>{username && selectUser && username}</div>
            }
        </>
    )
}