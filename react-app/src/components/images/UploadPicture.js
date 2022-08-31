import React, { useEffect, useState } from "react";
import './images.css'
import uploadImageIcon from '../../../src/images/imageuploadsvg.svg'


const UploadPicture = () => {

    const [image, setImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [imageGroup, setImageGroup] = useState([])
    const [hideImageInput, setHideImageInput] = useState(false)


    useEffect(() => {
        if (imageGroup.length >= 4) {
            setHideImageInput(true)
            return
        }

        if (image && imageGroup.length < 4) {
            const form = document.querySelector('.upload-image-form')
            const submitButton = document.querySelector(".upload-image-form-submit")
            form.requestSubmit(submitButton)
        }
    }, [image, imageGroup.length])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImage('')
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            setImageLoading(false);
            setImageGroup([...imageGroup, data.url])
        }
        else {
            const errors = await res.json()
            alert(errors.errors)
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling

        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <>
            <form className="upload-image-form" onSubmit={handleSubmit}>
                <label hidden={hideImageInput} htmlFor="file-upload" className="custom-file-upload">
                    <img src={uploadImageIcon} alt="" ></img>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".png,
                            .jpeg,
                            .jpg,
                            .gif,"
                    onChange={updateImage}
                />
                <button hidden={true} className="upload-image-form-submit" type="submit">Submit</button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
            <div>
                {imageGroup.length > 0 && imageGroup.map(el => (
                    <img key={Math.random() * 100000} alt="" src={el} ></img>
                ))}
            </div>
        </>
    )
}

export default UploadPicture;
