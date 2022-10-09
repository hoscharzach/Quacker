import { Link } from 'react-router-dom'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import './usercard.css'

export default function UserCard({ user }) {
    return (
        <Link to={`/profile/${user.username}`}>
            <div className="user-card-wrapper" >
                <div className='user-card-left-container'>
                    <img className='user-card-profile-pic' alt="" src={user.profilePic || defaultProfilePic}></img>
                </div>
                <div className='user-card-right-container'>
                    <div className='user-card-name-and-follow-button-container'>
                        <div className='user-card-name-username'>{user.displayName}<br></br>@{user.username}</div>
                        <div className='user-card-follow-button'>
                            <button>Follow PlaceHolder</button>
                        </div>
                    </div>
                    <div className='user-card-bio-text'>{user.bio}</div>
                </div>
            </div>
        </Link>
    )
}
