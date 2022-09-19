import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"


export default function ProfilePage() {
    const { username } = useParams()

    const dispatch = useDispatch()

    const user = useSelector(state => state.posts)
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
        <div className="center-column">
            <div className="profile-top-bar" onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }} style={{
                zIndex: '998',
                opacity: '.9',
                position: 'sticky',
                top: '0',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '15px',
                boxSizing: 'border-box',
                width: '650px',
                height: '50px',
                borderTop: '1px solid rgb(66, 83, 100)',
                borderBottom: '1px solid rgb(66, 83, 100)'
            }}>
                <div>
                    User's username and <br></br>
                    Number of tweets
                </div>
                <div id="profile-body-wrapper">

                </div>
            </div>
            <div id=""></div>
        </div>
    )
}
