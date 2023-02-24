import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loading from "../Loading"
import FollowCard from "./FollowCard"

export default function FollowsDisplay({ variant, username }) {

    const selectUser = useSelector(state => state.posts.users[username])
    const [followsLoaded, setFollowsLoaded] = useState(false)

    useEffect(() => {
        if (!selectUser) return

    }, [selectUser])

    console.log(selectUser.followersList)
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
                <div className="follows-container">
                    {variant}
                    {variant === 'Followers' ? selectUser.followersList.map((el, i) => <FollowCard key={i} username={el} />)
                        : selectUser.followingList.map((el, i) => <FollowCard key={i} username={el} />)}
                </div>
            }
        </div>
    )
}