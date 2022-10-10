import { Link, useHistory } from 'react-router-dom'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import './usercard.css'
const reactStringReplace = require('react-string-replace')

export default function UserCard({ user, keyword }) {

    const history = useHistory()

    return (
        <div className="user-card-wrapper" onClick={() => history.push(`/profile/${user.username}`)} >
            <div className='user-card-left-container'>
                <Link to={`/profile/${user.username}`}><img style={{ backgroundColor: 'white' }} className='user-card-profile-pic' alt="" src={user.profilePic || defaultProfilePic}></img></Link>
            </div>
            <div className='user-card-right-container'>
                <div className='user-card-name-and-follow-button-container'>
                    <div className='user-card-name-username'>{user.displayName}<br></br><span className='reply-card-dim'>@{keyword ? reactStringReplace(user.username, `${keyword}`, (match, i) => (
                        <span className='keyword' key={i}>{`${keyword}`}</span>
                    )) : user.username}</span></div>
                    <div className='user-card-follow-button'>
                        <button disabled onClick={() => history.push(`/profile/${user.username}`)} className='user-card-follow-button'>Follow</button>
                    </div>
                </div>
                <div className='user-card-bio-text'>{keyword ? reactStringReplace(user.bio, `${keyword}`, (match, i) => (
                    <span className='keyword' key={i}>{`${keyword}`}</span>
                )) : user.bio}</div>
            </div>
        </div>
    )
}
