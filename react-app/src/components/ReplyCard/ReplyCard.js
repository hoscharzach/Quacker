import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './replycard.css'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import { useEffect } from 'react'
import { intlFormatDistance } from 'date-fns'
import ReplyModal from '../ReplyModal/ReplyModal'
import { Link, useHistory } from 'react-router-dom'
import EditPostModal from '../EditPostModal/EditPostModal'
import { deletePostById } from '../../store/posts'
import deleteIcon from '../../images/deleteiconsquare.svg'

export default function ReplyCard({ replyId }) {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const reply = useSelector(state => state.posts.normPosts[replyId])
    const history = useHistory()
    return (
        <>
            {reply &&
                <div id="reply-card-wrapper">

                    <div className='reply-card-left'>
                        <img className='reply-card-profile-pic' src={defaultProfilePic} alt="" ></img>
                    </div>
                    <div className='reply-card-right'>
                        <div className='reply-card-user-timestamp-container'>
                            <Link to={`/profile/${reply.user.username}/post/${reply.id}`}>
                                {reply.user.displayName || reply.user.username} <span className='reply-card-dim'>@{reply.user.username} · {intlFormatDistance(Date.parse(reply.createdAt), new Date())} </span>
                            </Link>
                        </div>
                        <div className='reply-card-replying-to'>
                            {reply.inReplyTo && <span className='reply-card-dim'>Replying to @{reply.parent.user.username}</span>}
                        </div>
                        <div className='reply-card-content-container'><Link to={`/profile/${reply.user.username}/post/${reply.id}`}>{reply.content}</Link></div>
                        <div className='reply-card-images-container' data-images={reply.images.length}>
                            {reply.images.map(img => (
                                <Link key={img.id} to={`/profile/${reply.user.username}/post/${reply.id}`}><img className='reply-card-image' alt='' src={img.url}></img></Link>
                            ))}
                        </div>
                        <div className='reply-card-buttons'>
                            {sessionUser?.id === reply.user.id ?
                                <>
                                    <ReplyModal parentId={reply.id} text={reply.numReplies} />
                                    <EditPostModal post={reply} />
                                    <button style={{ display: 'flex', alignItems: 'center', padding: '0px' }} onClick={() => {
                                        dispatch(deletePostById(reply.id))
                                    }
                                    }><img src={deleteIcon} alt="" className='delete-icon' ></img>Delete</button>
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
