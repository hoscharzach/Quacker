import { Link, useHistory } from 'react-router-dom'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import './usercard.css'

export default function UserCard({ user }) {

    const history = useHistory()

    return (
        <div className="user-card-wrapper" onClick={() => history.push(`/profile/${user.username}`)} >
            <div className='user-card-left-container'>
                <Link to={`/profile/${user.username}`}><img style={{ backgroundColor: 'white' }} className='user-card-profile-pic' alt="" src={user.profilePic || defaultProfilePic}></img></Link>
            </div>
            <div className='user-card-right-container'>
                <div className='user-card-name-and-follow-button-container'>
                    <div className='user-card-name-username'>{user.displayName}<br></br><span className='reply-card-dim'>@{user.username}</span></div>
                    <div className='user-card-follow-button'>
                        <button onClick={() => history.push(`/profile/${user.username}`)} className='user-card-follow-button'>Follow</button>
                    </div>
                </div>
                <div className='user-card-bio-text'>{user.bio}</div>
            </div>
        </div>
    )
}
