import React, { useEffect, useState } from "react";
import './images.css'
import uploadImageIcon from '../../../src/images/imageuploadsvg.svg'
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../store/images";


const UploadPicture = () => {

    const staging = useSelector(state => state.images.staging)
    const imageGroup = Object.values(staging)


    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [hideImageInput, setHideImageInput] = useState(false)

    const dispatch = useDispatch()


    useEffect(() => {
        if (imageGroup.length >= 4) {
            return
        }
        else if (image) {
            const x = dispatch(uploadImage(image))
            if (x.errors) alert(x.errors.errors)
        }
    }, [image])

    useEffect(() => {
        setHideImageInput(imageGroup.length >= 4)
    }, [imageGroup])

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const handleFileClick = (e) => {
        const fileInput = document.getElementById("file-upload")
        fileInput.click()
    }

    return (
        <>
            <input
                id="file-upload"
                type="file"
                accept=".png,
                        .jpeg,
                        .jpg,
                        .gif,"
                onChange={updateImage}
                style={{ display: 'none' }}
            />

            <img hidden={hideImageInput} id="file-select" onClick={handleFileClick} src={uploadImageIcon} alt="" ></img>

            {(imageLoading) && <p>Loading...</p>}
        </>
    )
}

export default UploadPicture;
