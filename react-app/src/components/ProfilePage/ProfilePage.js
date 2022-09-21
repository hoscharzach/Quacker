import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import backbutton from '../../images/backbutton.svg'
import { useHistory } from "react-router-dom"


export default function ProfilePage() {
    const { username } = useParams()

    const history = useHistory()
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
        <div className="center-column">


            <div className="profile-top-bar" onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
                style={{
                    zIndex: '998',
                    opacity: '.9',
                    position: 'sticky',
                    top: '0',
                    display: 'flex',

                    alignItems: 'flex-start',
                    paddingLeft: '15px',
                    boxSizing: 'border-box',
                    width: '650px',
                    height: '53px',


                }}>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', marginRight: '20px' }}>
                    <button style={{ background: 'none' }} className="back-button" onClick={() => history.push('/home')}><img src={backbutton} alt="" ></img></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                    <div style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', spacing: 'normal' }}>User's username</div>
                    <div><span style={{ fontSize: '13px', color: '#8B98AF' }}>Number of tweets</span></div>
                </div>


            </div>
        </div>
    )
}
