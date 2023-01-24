import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loading from "../Loading"
import FollowCard from "./FollowCard"

export default function FollowsDisplay({ variant, username }) {

    const selectUser = useSelector(state => state.posts.users[username])
    const [type, setType] = useState(variant)
    const [list, setList] = useState([])
    const [followsLoaded, setFollowsLoaded] = useState(false)

    useEffect(() => {
        if (!selectUser) return

        if (variant === 'followers') {
            setList([...selectUser.followersList])
            setType('Followers')
            setFollowsLoaded(true)
        } else {
            setList([...selectUser.followingList])
            setType('Following')
            setFollowsLoaded(true)
        }
    }, [selectUser])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {!followsLoaded ? <Loading /> :
                <>
                    <div className="follows-container">
                        {type}
                        {list && list.map((el, i) => <FollowCard key={i} username={el} />)}
                    </div>
                </>
            }
        </div>
    )
}