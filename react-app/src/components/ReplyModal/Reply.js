import { useSelector } from 'react-redux'
import x from '../../images/imageclose-x.svg'
import './replymodal.css'
import defaultProfilePic from '../../images/defaultprofilepic.svg'
import { intlFormatDistance } from 'date-fns'
import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeErrors, addError } from '../../store/session'
import { clearImages } from '../../store/images'
import { createNewPost } from '../../store/posts'
import UploadPicture from '../UploadPicture'
import { nanoid } from 'nanoid'
import { useHistory } from 'react-router-dom'

export default function Reply({ parentId, setShowModal }) {

    const dispatch = useDispatch()
    const replyModalTextInput = useRef(null)
    const history = useHistory()

    const parent = useSelector(state => state.posts.normPosts[parentId])
    const sessionUser = useSelector(state => state.session.user)
    const errors = useSelector(state => state.session.errors)
    const images = useSelector(state => state.images.staging)
    const numImages = Object.values(images)?.length

    const [content, setContent] = useState('')
    const [style, setStyle] = useState('black')

    function changeContent(e) {
        setContent(e.target.value)
    }

    useEffect(() => {
        if (content.length < 1) setStyle('red')
        else if (content.length >= 260) setStyle('red')
        else if (content.length >= 230) setStyle('#DEC20B')
        else setStyle('black')

        replyModalTextInput.current.style.height = 'auto'
        replyModalTextInput.current.style.height = replyModalTextInput.current.scrollHeight + 'px'

        if (content.length > 280) {
            replyModalTextInput.current.style.backgroundColor = 'red'
        } else {
            replyModalTextInput.current.style.backgroundColor = 'inherit'
        }
    }, [content])

    async function handleSubmit(e) {
        e.preventDefault()
        dispatch(removeErrors())

        const payload = {
            parentId,
            content,
            images: Object.values(images)
        }

        const data = await dispatch(createNewPost(payload))
        if (data) {
            dispatch(addError(data.error))
        } else {
            setContent('')
            replyModalTextInput.current.style.height = '1rem'
            dispatch(clearImages())
            if (setShowModal) {
                setShowModal(false)
                history.push(`/profile/${parent.user.username}/post/${parent.id}`)
            }
        }
    }

    return (
        <>
            {parent &&
                <div id="reply-modal-container">
                    <div className="reply-modal-header-container">
                        <div className='x-button-container'>
                            <div className='x-button-container'>

                                <button id='x-button' onClick={() => setShowModal(false)}><img id="x-icon" src={x} alt=""></img></button>
                            </div>
                        </div>
                        <div className='reply-modal-errors-container'>
                            {errors && errors.map(err => (
                                <div key={nanoid()}><span className='error-message'>{err}</span></div>
                            ))}
                        </div>

                    </div>
                    <div className="reply-modal-body-container">
                        <div className='reply-modal-parent-left'>
                            <img className='reply-modal-parent-profile-pic' src={defaultProfilePic} alt=""></img>
                            <div className='reply-modal-connecting-line-container'>
                                <div className='reply-modal-connecting-line'></div>
                            </div>
                        </div>
                        <div className='reply-modal-parent-right'>
                            <div>
                                {parent.user.displayName || parent.user.username} <span className='reply-modal-username-timestamp'>@{parent.user.username} · {intlFormatDistance(Date.parse(parent.createdAt), new Date())}</span>
                            </div>
                            <div className='reply-modal-parent-content'>
                                {parent.content}
                                <div>{parent.images.map((img, i) => (
                                    <a target={"_blank"} href={`${img.url}`}>{`quacker-app.com/${parent.id}/image/${i + 1} `}</a>
                                ))}
                                </div>
                            </div>
                            <div className='reply-modal-replying-to-text'>
                                <span className='reply-modal-username-timestamp'>Replying to </span><span className='reply-modal-at'>@{parent.user.username}</span>
                            </div>
                        </div>
                    </div>
                    <div className="reply-modal-footer-container">
                        <div className='reply-modal-footer-left'>
                            <img className='reply-modal-user-profile-pic' alt='' src={sessionUser.profilePic || defaultProfilePic} ></img>
                        </div>
                        <div className='reply-modal-footer-right'>
                            <div className='reply-modal-input-container'>
                                <textarea value={content} onChange={changeContent} placeholder='Quack your reply' id='reply-modal-input' ref={replyModalTextInput} ></textarea>

                            </div>
                            {Object.values(images) &&
                                <div className='reply-modal-images-container' data-images={numImages} >
                                    {Object.values(images).map(img => (
                                        <img className='reply-modal-image' src={img.url} alt="" key={img.id} ></img>
                                    ))}
                                </div>}
                            <div className='reply-modal-buttons-container'>
                                <UploadPicture />
                                <div onClick={handleSubmit} id='reply-modal-submit-button'><span className='reply-modal-button-text'>Reply</span></div>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}
