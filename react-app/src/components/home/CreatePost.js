import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearImages } from "../../store/images"
import { createNewPost } from "../../store/posts"
import UploadPicture from "../UploadPicture"
import './createpost.css'

export default function CreatePost() {

    const dispatch = useDispatch()

    const images = useSelector(state => state.images.staging)

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    // useEffect(() => {
    //     return () => dispatch(clearImages())
    // }, [])

    function changeContent(e) {
        setContent(e.target.value)

        content.length >= 275 ?
            document.getElementsByClassName('character-count-text')[0].style.color = 'red' :
            document.getElementsByClassName('character-count-text')[0].style.color = 'black'
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const payload = {
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
            <textarea className="new-post-text" maxLength={280} onChange={changeContent} value={content} placeholder="What's happening?" ></textarea>
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
                    <span className="character-count-text">Character Limit: {content.length}/280</span>
                </div>
            </div>
        </div>
    )

}
