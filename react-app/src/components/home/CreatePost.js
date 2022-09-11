import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearImages, removeImage } from "../../store/images"
import { createNewPost } from "../../store/posts"
import { Link } from "react-router-dom"
import defaultProfile from '../../images/defaultprofilepic.svg'
import UploadPicture from "../UploadPicture"
import './createpost.css'
import { addError, removeErrors } from "../../store/session"
import x from '../../images/imageclose-x.svg'

export default function CreatePost({ parentId, setShowModal }) {

    const textInput = useRef(null)

    const dispatch = useDispatch()

    const selectUser = useSelector(state => state.session.user)
    const selectParentPost = useSelector(state => state.posts.normPosts[parentId])
    const images = useSelector(state => state.images.staging)
    const errors = useSelector(state => state.session.errors)

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

        textInput.current.style.height = 'auto'
        textInput.current.style.height = textInput.current.scrollHeight + 'px'

        if (content.length > 280) {
            textInput.current.style.backgroundColor = 'red'
        } else {
            textInput.current.style.backgroundColor = 'inherit'
        }
    }, [content])


    useEffect(() => {
        dispatch(removeErrors())
    }, [])

    useEffect(() => {
        return () => dispatch(clearImages())
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
        }


    }

    console.log(images)

    return (
        <>
            {errors?.length > 0 &&
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '10px 0px' }} className="home-errors-container">

                    {errors.map(err => (
                        <div className="error-message">{err}</div>
                    ))}
                </div>}
            <div className="entire-create-post-wrapper">
                <div className="create-post-profile-pic-wrapper">
                    <img className="profile-picture" src={selectUser.profilePic || defaultProfile} alt=""></img>
                </div>

                <div className="new-post-wrapper">
                    <textarea rows={1} ref={textInput} className="new-post-text" onChange={changeContent} value={content} placeholder="What's quackin'?" ></textarea>
                    <>
                        {Object.values(images)?.length > 0 &&
                            <div className="staging-images-wrapper" data-images={Object.values(images)?.length} >
                                {Object.values(images)?.map(el => (
                                    <div id="staging-image-div" key={el.id}>
                                        <button onClick={() => dispatch(removeImage(el.id))} className="staging-x-container"><img className="staging-x-icon" src={x} alt="" ></img></button>
                                        <img className="staging-image" src={el.url}></img>
                                    </div>
                                ))}
                            </div>}

                        <div className="new-post-buttons-border">

                            <div className="new-post-buttons">
                                <UploadPicture />

                                <div className="char-count-and-quack-button">
                                    <button className="main-quack-button" onClick={handleSubmit}>Quack</button>
                                </div>
                            </div>
                        </div>
                    </>

                </div >
            </div>
        </>
    )

}
