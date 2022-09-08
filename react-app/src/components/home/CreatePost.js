import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearImages } from "../../store/images"
import { createNewPost } from "../../store/posts"
import { Link } from "react-router-dom"
import defaultProfile from '../../images/defaultprofilepic.svg'
import UploadPicture from "../UploadPicture"
import './createpost.css'
import { addError, removeErrors } from "../../store/session"

export default function CreatePost({ parentId, setShowModal }) {


    const textInput = useRef(null)

    const dispatch = useDispatch()

    const selectUser = useSelector(state => state.session.user)
    const selectParentPost = useSelector(state => state.posts.normPosts[parentId])
    const images = useSelector(state => state.images.staging)
    const errors = useSelector(state => state.session.errors)

    const [content, setContent] = useState('')
    const [style, setStyle] = useState('black')
    const [hideCounter, setHideCounter] = useState(true)
    const [imageStyle, setImageStyle] = useState({})

    function changeContent(e) {
        setContent(e.target.value)
    }

    useEffect(() => {
        if (images.length === 1) {
            imageStyle = {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
    }, [images])

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
            textInput.current.style.backgroundColor = '#716F81'
        }

        if (content.length > 0) {
            setHideCounter(false)
        } else setHideCounter(true)
    }, [content])


    useEffect(() => {
        dispatch(removeErrors())
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
            textInput.current.style.height = 'auto'
            if (setShowModal) setShowModal(false)
            dispatch(clearImages())
        }


    }

    return (
        <>
            {!!errors && errors.map(err => (
                <p className="error-message">{err}</p>
            ))}
            <div className="entire-create-post-wrapper">
                <div className="create-post-profile-pic-wrapper">
                    <img className="profile-picture" src={selectUser.profilePic || defaultProfile} alt=""></img>
                </div>

                <div className="new-post-wrapper">

                    {selectParentPost &&
                        <div className="post-container" >
                            <div className='post-profile-icon-container'>
                                <Link to={`/profile/${selectParentPost.user.username}`}><img src={selectParentPost.user.profilePicture || defaultProfile} alt=""></img></Link>
                            </div>
                            <div className='post-right-container'>

                                <span className='post-content-text'>
                                    {selectParentPost.content}<br></br>
                                    {selectParentPost.images.length > 0 &&
                                        selectParentPost.images.map(el => (
                                            <a target="_blank" href={el.url} key={el.id}>
                                                {el.url}</a>

                                        ))}
                                    <br></br>
                                    <strong>Post ID: {selectParentPost.id}</strong><br></br>
                                    <strong>Username: {selectParentPost.user.username}</strong>
                                    <Link to={`/profile/${selectParentPost.user.username}/post/${selectParentPost.id}`}>
                                        {`${selectParentPost.createdAt.slice(8, 11)} ${selectParentPost.createdAt.slice(5, 7)}`}
                                    </Link>
                                </span>


                            </div>
                        </div>}
                    <textarea ref={textInput} className="new-post-text" onChange={changeContent} value={content} placeholder="What's quackin'?" ></textarea>

                    <div style={{ display: 'flex' }}>
                        {Object.values(images)?.length > 0 &&
                            Object.values(images)?.map(el => (
                                <div className="staging-image-container" key={el.id} >
                                    <img className="staging-image" src={el.url}></img>
                                </div>
                            ))}
                        <div className="new-post-buttons-border">

                            <div className="new-post-buttons">
                                <UploadPicture />
                                <button onClick={handleSubmit}>Quack</button>
                                <span hidden={hideCounter} style={{ color: style }}>{280 - content.length}</span>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )

}
