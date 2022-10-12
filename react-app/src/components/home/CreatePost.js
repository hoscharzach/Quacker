import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearImages, removeImage } from "../../store/images"
import { createNewPost } from "../../store/posts"
import { useHistory } from "react-router-dom"
import defaultProfile from '../../images/defaultprofilepic.svg'
import UploadPicture from "../UploadPicture"
import './createpost.css'
import { nanoid } from "nanoid"
import { addError, removeErrors } from "../../store/session"
import x from '../../images/imageclose-x.svg'

export default function CreatePost({ parentId, setReplyModalOpen }) {

    const textInput = useRef(null)
    const circleProgress = useRef(null)
    const history = useHistory()
    const dispatch = useDispatch()

    const selectUser = useSelector(state => state.session.user)
    const selectParentPost = useSelector(state => state.posts.normPosts[parentId])
    const images = useSelector(state => state.images.staging)
    const errors = useSelector(state => state.session.errors)

    const [content, setContent] = useState('')
    const [style, setStyle] = useState('black')
    const [progress, setProgress] = useState(0)



    function changeContent(e) {
        setContent(e.target.value)
    }

    useEffect(() => {
        if (content.length >= 281) return
        setProgress((content.length / 280) * 100)
    }, [content])

    useEffect(() => {
        textInput.current.style.height = 'auto'
        textInput.current.style.height = textInput.current.scrollHeight + 'px'
        if (content.length > 280) {
            textInput.current.style.backgroundColor = 'red'
        } else {
            textInput.current.style.backgroundColor = 'inherit'
        }
    }, [content])

    useEffect(() => {
        if (content.length >= 280) {
            circleProgress.current.style.background = `conic-gradient(red ${((content.length / 280)) * 360}deg, #38444d 0deg)`
        }
        else if (content.length < 260) {
            circleProgress.current.style.background = `conic-gradient(#1d9bf0 ${((content.length / 280)) * 360}deg, #38444d 0deg)`
        }
        else if (content.length >= 260) {
            circleProgress.current.style.background = `conic-gradient(yellow ${((content.length / 280)) * 360}deg, #38444d 0deg)`
        }
    }, [circleProgress, content.length])


    useEffect(() => {
        if (setReplyModalOpen) {
            setContent('')
        }
    }, [setReplyModalOpen])

    useEffect(() => {
        dispatch(removeErrors())
    }, [])

    useEffect(() => {
        return () => {
            dispatch(clearImages())
            setContent('')
        }
    }, [])

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
            textInput.current.style.height = '1.2rem'
            dispatch(clearImages())
            if (setReplyModalOpen) {
                history.push('/home')
                setReplyModalOpen(false)
            }
        }


    }

    return (
        <>
            {errors?.length > 0 &&
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '7px', borderTopRightRadius: '24px', borderTopLeftRadius: '24px' }} className="home-errors-container">

                    {errors.map(err => (
                        <div key={nanoid()} className="error-message">{err}</div>
                    ))}
                </div>}
            <div style={setReplyModalOpen && { boxSizing: 'border-box', padding: '20px', borderRadius: '24px', borderBottom: 'none' }} className="entire-create-post-wrapper">
                <div style={setReplyModalOpen && { borderRadius: '24px' }} className="create-post-profile-pic-wrapper">
                    <img className="profile-picture" src={selectUser.profilePic || defaultProfile} alt=""></img>
                </div>

                <div className="new-post-wrapper">
                    <textarea rows={2} ref={textInput} className="new-post-text" onChange={changeContent} value={content} placeholder="What's quackin'?" ></textarea>
                    <>
                        {images &&
                            <div className="staging-images-wrapper" data-images={Object.values(images)?.length} >
                                {Object.values(images).map(el => (
                                    <div id="staging-image-div" key={el.id}>
                                        <button onClick={() => dispatch(removeImage(el.id))} className="staging-x-container"><img className="staging-x-icon" src={x} alt="" ></img></button>
                                        <img className="staging-image" src={el.url}></img>
                                    </div>
                                ))}
                            </div>}

                        <div className="new-post-buttons-border">

                            <div className="new-post-buttons">
                                <div ref={circleProgress} className="circle-progress">
                                    <div style={content.length > 280 ? { color: 'red' } : null} className="progress-value">{280 - content.length < 20 && (280 - content.length)}</div>
                                </div>
                                <div className="divider">

                                </div>
                                <UploadPicture />

                                <div className="char-count-and-quack-button">
                                    <button disabled={content.length > 280 || content.trim().length === 0 || (content.length < 1 && Object.values(images)?.length === 0)} className="main-quack-button" onClick={handleSubmit}>Quack</button>
                                </div>
                            </div>
                        </div>
                    </>

                </div >
            </div>
        </>
    )

}
