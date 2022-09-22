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

export default function ReplyCard({ reply, name, setShowModal }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()

    return (
        <>
            {reply &&
                <div id="reply-card-wrapper" className={name}>
                    <div className='reply-card-left'>
                        <img className='reply-card-profile-pic' src={defaultProfilePic} alt="" ></img>
                    </div>
                    <div className='reply-card-right'>
                        <div className='reply-card-user-timestamp-container'>
                            {reply.user.displayName || reply.user.username} <span className='reply-card-dim'>@{reply.user.username} · {intlFormatDistance(Date.parse(reply.createdAt), new Date())} </span>
                        </div>
                        <div className='reply-card-replying-to'>
                            {reply.parent && <span className='reply-card-dim'>Replying to @{reply.parent.user.username}</span>}
                        </div>
                        <div className='reply-card-content-container'><Link to={`/post/${reply.id}`} >{reply.content}</Link></div>
                        <Link to={`/post/${reply.id}`}><div className='reply-card-images-container' data-images={reply.images.length}>
                            {reply.images.map(img => (
                                <img key={img.id} className='reply-card-image' alt='' src={img.url}></img>
                            ))}
                        </div>
                        </Link>
                        <div className='reply-card-buttons'>
                            {sessionUser?.id === reply.user.id ?
                                <>
                                    <ReplyModal parentId={reply.id} text={reply.numReplies} />
                                    <EditPostModal post={reply} />
                                    <button style={{ position: 'relative', zIndex: 5, display: 'flex', alignItems: 'center', padding: '0px' }} onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()

                                        dispatch(deletePostById(reply.id))
                                    }
                                    }><img src={deleteIcon} alt="" className='delete-icon' ></img></button>
                                </> :
                                <ReplyModal parentId={reply.id} text={reply.numReplies} />
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
