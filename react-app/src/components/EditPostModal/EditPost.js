import { useEffect, useReducer, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePostById } from "../../store/posts"
import { addError, removeErrors } from "../../store/session"
import './editpost.css'
import x from '../../images/imageclose-x.svg'


export default function EditPost({ post, setEditModalOpen }) {
    const dispatch = useDispatch()
    const editTextInput = useRef(null)

    const errors = useSelector(state => state.session.errors)
    const [content, setContent] = useState(post.content || '')

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
            setEditModalOpen(false)
        }


    }
    useEffect(() => {
        editTextInput.current.style.height = 'auto'
        editTextInput.current.style.height = editTextInput.current.scrollHeight + 'px'

        if (content.length > 280) {
            editTextInput.current.style.backgroundColor = 'red'
        } else {
            editTextInput.current.style.backgroundColor = 'inherit'
        }
    }, [content])

    useEffect(() => {
        return () => dispatch(removeErrors())
    }, [])

    return (


        <>
            <div id="edit-post-wrapper">
                <div id="edit-post-header">
                    <div>Editing {post.inReplyTo ? 'Reply' : 'Quack'}</div>
                    <div onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setEditModalOpen(false)
                    }} id="edit-post-x-container">
                        <img id="edit-post-x" alt="" src={x} ></img>
                    </div>
                </div>
                <div id="edit-post-body">
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 0px' }} id="edit-post-errors-container">
                        {errors && errors.map(err => (
                            <div className="error-message">{err}</div>
                        ))}
                    </div>
                    <textarea ref={editTextInput} placeholder="Change your mind...?" onChange={updateContent} value={content} className="edit-post-input"></textarea>
                </div>
                <div id="edit-post-footer">

                    <button disabled={content.length > 280 || content.trim().length === 0 || content.length < 1} className="main-quack-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}
