import { useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePostById } from "../../store/posts"
import { addError, removeErrors } from "../../store/session"
import './editpost.css'


export default function EditPost({ post, setShowModal }) {
    const dispatch = useDispatch()

    const errors = useSelector(state => state.session.errors)
    const [content, setContent] = useState(post.content || '')
    const selectPost = useSelector(state => state.posts.normPosts?.[post?.id])

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = async (e) => {
        dispatch(removeErrors())
        e.preventDefault()
        const payload = {
            id: post.id,
            content
        }

        const data = await dispatch(updatePostById(payload))
        if (data) {
            dispatch(addError(data.error))
        } else {
            setShowModal(false)
        }


    }
    return (
        <>
            <div className="edit-post-modal-container">

                <div className="edit-post-errors-container">

                    {errors && errors.length > 0 &&
                        errors.map(err => (
                            <p className="error-message">{err}</p>
                        ))}
                </div>
                <textarea className="new-post-text" value={content} onChange={updateContent}></textarea>
                <button onClick={handleSubmit}>Submit Changes</button>
                <p>UserId {post.user.id} </p>
                <p>Posted on: {post.createdAt}</p>
            </div>
        </>
    )
}
