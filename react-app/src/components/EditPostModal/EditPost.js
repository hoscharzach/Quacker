import { useReducer, useState } from "react"
import { useDispatch } from "react-redux"
import { updatePostById } from "../../store/posts"
import './editpost.css'


export default function EditPost({ post, setShowModal }) {
    const dispatch = useDispatch()

    const [content, setContent] = useState(post.content)
    const [images, setImages] = useState(post.images)

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            id: post.id,
            content
        }

        await dispatch(updatePostById(payload))
            .then(() => setShowModal(false))
            .catch(data => window.alert(data))

    }
    return (
        <div className="edit-post-modal-container">
            <h3>By: {post.user.username}</h3>
            <textarea className="new-post-text" value={content} onChange={updateContent}></textarea>
            <button onClick={handleSubmit}>Submit Changes</button>
            <p>UserId {post.user.id} </p>
            <p>Posted on: {post.createdAt}</p>
            <div>
                {post.images.length > 0 &&
                    post.images.map(el => (
                        <img className="edit-image" src={el.url} alt="" key={el.id}></img>
                    ))}
            </div>
        </div>
    )
}
