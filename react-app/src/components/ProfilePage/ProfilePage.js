import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"


export default function ProfilePage() {
    const { username } = useParams()

    const dispatch = useDispatch()

    const user = useSelector(state => state.posts.user)
    const sessionUser = useSelector(state => state.session.user)

    const [loaded, setLoaded] = useState(true)


    useEffect(() => {
        if (user) {
            setLoaded(true)
        } else {
            // dispatch (fetch user)
        }
    }, [username])

    return (
        <div className="center-column h-screen">


            <div className="h-[53px]" onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }}>
                User's username and
                Number of tweets
                test

            </div>
        </div>
    )
}
