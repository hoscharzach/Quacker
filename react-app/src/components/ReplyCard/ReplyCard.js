import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import './replycard.css'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import { intlFormatDistance } from 'date-fns'
import ReplyModal from '../ReplyModal/ReplyModal'
import { Link } from 'react-router-dom'
import BasicMenu from '../MenuDropdown'
import { Box, IconButton, Modal } from '@mui/material'
import LikeButton from '../LikeButton'
import LikeButtonFilled from '../LikeButtonFilled'
import { likePostToggle } from '../../store/posts'
import { updateSessionUserLikes } from '../../store/session'
const reactStringReplace = require('react-string-replace')


export default function ReplyCard({ reply, name, borderTop, parent, keyword }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [image, setImage] = useState('')

    const likeTextStyle = sessionUser.postLikes.has(reply?.id) ? { color: 'rgb(249, 24, 128)' } : { color: '#8B98A5' }

    const likeButtonStyles = {
        '&:hover': {
            backgroundColor: 'rgb(249, 24, 128, .1)',
        },
        '&:hover *': {
            fill: 'rgb(249, 24, 128)',
        },
    }

    async function handleLike() {
        dispatch(likePostToggle(reply.id))
        dispatch(updateSessionUserLikes(reply.id))
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
        backgroundColor: '#15202b',
        border: '2px solid #15202b',
        boxShadow: 24,
        p: 2,
    };

    return (
        <>
            {reply &&
                <div className={`reply-card-wrapper ${name}`} style={borderTop ? { borderTop: 'none' } : null}>
                    <div className='reply-card-left'>
                        <div className='reply-card-line-container' style={{ height: '12px', marginBottom: '4px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            {parent && <div className='reply-card-line'></div>}
                        </div>
                        <Link to={`/profile/${reply.user.username}`}>
                            <img style={{ backgroundColor: 'white', }} className='reply-card-profile-pic' src={reply.user.profilePic || defaultProfilePic} alt="" ></img>
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
                        <div className='reply-card-content-container'><Link to={`/post/${reply.id}`} >{keyword ? reactStringReplace(reply.content, `${keyword}`, (match, i) => (
                            <span className='keyword' key={i}>{`${keyword}`}</span>
                        )) : reply.content}</Link></div>
                        <div className='reply-card-images-container' data-images={reply.images.length}>
                            {reply.images.map((img, i) => (
                                <img onClick={() => {
                                    setImage(img.url)
                                    setImageModalOpen(true)
                                }} key={img.id} className='reply-card-image' alt='' src={img.url}></img>
                            ))}
                        </div>

                        <div className='reply-card-buttons'>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <ReplyModal type={'reply'} parentId={reply.id} numReplies={reply.numReplies} />

                            </Box>
                            <Box
                                sx={{
                                    currentColor: 'rgba(249, 24, 128, .1)',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                {sessionUser &&
                                    sessionUser.postLikes.has(reply.id) ?
                                    <IconButton sx={likeButtonStyles} onClick={handleLike}>
                                        <LikeButtonFilled width={'22.25'} height={'22.25'} />
                                    </IconButton> :
                                    <IconButton sx={likeButtonStyles} onClick={handleLike}>
                                        <LikeButton height={'22.25'} width={'22.25'} />
                                    </IconButton>
                                }
                                <span style={likeTextStyle}>{reply.userLikes.length}</span>
                            </Box>
                        </div>
                    </div>
                </div>



            }

            <Modal
                open={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img style={{ maxWidth: '95vw', height: 'auto', maxHeight: '95vh' }} alt='' src={image}>
                    </img>
                </Box>
            </Modal>

        </>
    )
}
