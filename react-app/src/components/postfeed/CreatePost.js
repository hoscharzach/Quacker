import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearImages } from "../../store/images"
import UploadPicture from "../imagetestcomponent/UploadPicture"
import './createpost.css'

export default function CreatePost() {

    const dispatch = useDispatch()

    const images = useSelector(state => state.images.staging)

    // const [staging, setStaging] = useState([])
    const [content, setContent] = useState('')

    useEffect(() => {
        return () => dispatch(clearImages())
    }, [])

    // useEffect(() => {
    //     setStaging(Object.values(images))
    //     console.log(staging)
    // }, [images])

    function changeContent(e) {
        setContent(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const newPost = {
            content,
            images: Object.values(images)
        }

        const response = await fetch('/api/posts/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost),
        })

        setContent('')
        dispatch(clearImages())

    }

    console.log(images)

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
                </div>
            </div>
        </div>
    )
}
