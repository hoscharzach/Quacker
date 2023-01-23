import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loading from "../Loading"

export default function FollowsDisplay({ variant, username }) {

    const selectUser = useSelector(state => state.posts[username])
    const [type, setType] = useState(variant)
    const [list, setList] = useState(null)
    const [followsLoaded, setFollowsLoaded] = useState(false)

    useEffect(() => {
        if (variant === 'followers') {
            if (!selectUser?.followersList) {
                // fetch followers list and load into state

            }
        }

        else if (variant === 'following') {
            if (!selectUser?.followingList) {
                // fetch following list
            }
        }

    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {!followsLoaded ? <Loading /> : <div>{'follows'}</div>}
        </div>
    )
}