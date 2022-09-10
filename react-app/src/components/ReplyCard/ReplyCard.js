import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './replycard.css'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import { useEffect } from 'react'
import { intlFormatDistance } from 'date-fns'

export default function ReplyCard({ replyId, parentId }) {

    // const reply = useSelector(state => state.posts.normPosts[186])
    const dispatch = useDispatch()

    const [reply, setReply] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/posts/185`);
            const post = await response.json()
            setReply(post.post);
        })();
    }, []);

    console.log(reply)

    return (
        <>
            {reply &&
                <div id="reply-card-wrapper">
                    <div className='reply-card-left'>
                        <img className='reply-card-profile-pic' src={defaultProfilePic} alt="" ></img>
                    </div>
                    <div className='reply-card-right'>
                        <div className='reply-card-user-timestamp-container'>
                            {reply.user.displayName || reply.user.username} <span className='reply-card-dim'>@{reply.user.username} · {intlFormatDistance(Date.parse(reply.createdAt), new Date())} </span>
                        </div>
                        <div className='reply-card-replying-to'>
                            <span className='reply-card-dim'>Replying to @{reply.parent.user.username}</span>
                        </div>
                        <div className='reply-card-content-container'>{reply.content}</div>
                        <div className='reply-card-images-container' data-images={reply.images.length}>
                            {reply.images.map(img => (
                                <img className='reply-card-image' alt='' src={img.url}></img>
                            ))}
                        </div>
                        <div className='reply-card-buttons'>buttons</div>
                    </div>
                </div>
            }
        </>
    )
}
