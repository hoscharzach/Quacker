import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import backbutton from '../../images/backbutton.svg'
import { useHistory } from "react-router-dom"
import autoprefixer from "autoprefixer"


export default function ProfilePage() {
    const { username } = useParams()

    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.posts.users[username])
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
                    marginBottom: '10px'
                }}>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', marginRight: '20px' }}>
                    <button style={{ background: 'none' }} className="back-button" onClick={() => history.push('/home')}><img src={backbutton} alt="" ></img></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

                    <div style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', spacing: 'normal' }}>User's username</div>
                    <div><span style={{ fontSize: '13px', color: '#8B98AF' }}>Number of tweets</span></div>
                </div>
            </div>
            <div style={{ position: 'relative', height: '200px', width: '650px' }}>
                <div style={{ height: '200px', width: '650px' }} className="profile-background">
                    <img style={{ width: '100%', height: '100%' }} src="https://pbs.twimg.com/profile_banners/432081885/1448428400/1500x500" alt=""></img>
                </div>
            </div>
            <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', height: '200px' }} className="below-background-profile-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', height: '70px', width: '630px' }}>
                    <div style={{ width: '141px' }}>
                        <div style={{ position: 'absolute', height: '133px', width: '133px', backgroundColor: 'white', borderRadius: '50%', left: '15px', top: '-70px' }}></div>
                    </div>
                    <div style={{ width: '110px' }}></div>
                </div>
                <div style={{ marginTop: '10px' }} className="profile-name-username">NAME AND</div>
                <div>Username</div>
                <div style={{ fontSize: '15px' }} className="profile-bio">LOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUMLOREM IPSUM LOREM IPSUM</div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '53px' }}>
                TWEETS/TWEETS AND REPLIES BUTTONS
            </div>

        </div>
    )
}
