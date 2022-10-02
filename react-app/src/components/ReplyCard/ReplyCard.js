import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useContext } from 'react'
import './replycard.css'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import { intlFormatDistance } from 'date-fns'
import ReplyModal from '../ReplyModal/ReplyModal'
import { Link, useHistory } from 'react-router-dom'
import EditPostModal from '../EditPostModal/EditPostModal'
import { deletePostById } from '../../store/posts'
import deleteIcon from '../../images/deleteiconsquare.svg'
import BasicMenu from '../MenuDropdown'

export default function ReplyCard({ reply, name, borderTop }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()

    return (
        <>
            {reply &&
                <div className={`reply-card-wrapper ${name}`} style={borderTop ? { borderTop: 'none' } : null}>
                    <div className='reply-card-left'>
                        <div style={{ height: '12px', marginBottom: '4px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        </div>
                        <Link to={`/profile/${reply.user.username}`}>
                            <img className='reply-card-profile-pic' src={reply.user.profilePic || defaultProfilePic} alt="" ></img>
                        </Link>
                    </div>
                    <div className='reply-card-right'>
                        <div style={{ boxSizing: 'border-box', height: '12px', padding: '12px 0px 0px', width: '100%' }}></div>
                        <div style={{ height: '20px' }} className='reply-card-top-row'>
                            <div className='reply-card-user-timestamp-container'>
                                <Link to={`/profile/${reply.user.username}`}>
                                    <span className='underline-white'>{reply.user.displayName || reply.user.username}</span>
                                    <span className='reply-card-dim'> @{reply.user.username} · </span>
                                </Link>
                                <Link to={`/post/${reply.id}`}>
                                    <span className='underline-dim'>{intlFormatDistance(Date.parse(reply.createdAt), new Date())}</span>
                                </Link>
                            </div>
                            <BasicMenu post={reply} className="basic-menu" />
                        </div>
                        <div className='reply-card-replying-to'>
                            {reply.parent && <span className='reply-card-dim'>Replying to <Link style={{ color: 'rgb(24, 120, 184)' }} to={`/profile/${reply.parent.user.username}`}>@{reply.parent.user.username}</Link></span>}
                        </div>
                        <div className='reply-card-content-container'><Link to={`/post/${reply.id}`} >{reply.content}</Link></div>
                        <Link to={`/post/${reply.id}`}><div className='reply-card-images-container' data-images={reply.images.length}>
                            {reply.images.map(img => (
                                <img key={img.id} className='reply-card-image' alt='' src={img.url}></img>
                            ))}
                        </div>
                        </Link>
                        <div className='reply-card-buttons'>
                            <ReplyModal parentId={reply.id} text={reply.numReplies} />
                        </div>
                    </div>
                </div>

            }
        </>
    )
}
