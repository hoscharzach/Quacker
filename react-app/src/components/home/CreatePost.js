import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearImages } from "../../store/images"
import { createNewPost } from "../../store/posts"
import { Link } from "react-router-dom"
import defaultProfile from '../../images/defaultprofilepic.svg'
import UploadPicture from "../UploadPicture"
import './createpost.css'

export default function CreatePost({ parentId }) {

    console.log(parentId, "PARENT ID IN CREATE POST COMPONENT")

    const dispatch = useDispatch()


    const selectParentPost = useSelector(state => state.posts.normPosts[parentId])
    console.log(selectParentPost, "PARENT POST IN CREATE POST COMPONENT")
    const images = useSelector(state => state.images.staging)

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const [style, setStyle] = useState('black')

    function changeContent(e) {
        setContent(e.target.value)
    }

    useEffect(() => {
        if (content.length >= 260) setStyle('red')
        else if (content.length >= 230) setStyle('#DEC20B')
        else setStyle('black')
    }, [content])

    async function handleSubmit(e) {
        e.preventDefault()
        setErrors([])

        const payload = {
            parentId,
            content,
            images: Object.values(images)
        }

        await dispatch(createNewPost(payload))
            .then(data => {
                setContent('')
                dispatch(clearImages())
            })
            .catch(data => {
                setErrors(data)
            })

    }


    return (

        <div className="new-post-wrapper">
            {selectParentPost &&
                <div className="post-container" >
                    <div className='post-profile-icon-container'>
                        <Link to={`/profile/${selectParentPost.user.username}`}><img src={selectParentPost.user.profilePicture || defaultProfile} alt=""></img></Link>
                    </div>
                    <div className='post-right-container'>

                        <span className='post-content-text'>
                            {selectParentPost.content} <strong>Post ID: {selectParentPost.id}</strong><br></br>
                            <strong>Username: {selectParentPost.user.username}</strong>
                            <Link to={`/profile/${selectParentPost.user.username}/post/${selectParentPost.id}`}>
                                {`${selectParentPost.createdAt.slice(8, 11)} ${selectParentPost.createdAt.slice(5, 7)}`}
                            </Link>
                        </span>

                        {selectParentPost.images.length > 0 &&
                            selectParentPost.images.map(selectParentPost => (
                                <div key={selectParentPost.id} className='post-images-wrapper'>
                                    <img alt='' src={selectParentPost.url}></img>

                                </div>

                            ))}
                    </div>
                </div>}
            <textarea className="new-post-text" maxLength={280} onChange={changeContent} value={content} placeholder="What's quackin'?" ></textarea>
            <div className="staging-images">
                {Object.values(images).length > 0 &&
                    Object.values(images).map(el => (
                        <div key={el.id} >
                            <img src={el.url}></img>
                        </div>
                    ))}
                <div className="new-post-buttons">
                    <UploadPicture />
                    <button onClick={handleSubmit}>Quack</button>
                    <span style={{ color: style }}>{280 - content.length}</span>
                </div>
            </div>
        </div>
    )

}
