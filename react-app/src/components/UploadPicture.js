import React, { useEffect, useState } from "react";
import './images.css'
import uploadImageIcon from '../images/imageuploadsvg.svg'
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../store/images";


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
            (async () => {
                const errors = await dispatch(uploadImage(image));
                if (errors) alert(errors)
            })()
        }
    }, [image, dispatch])

    useEffect(() => {
        setHideImageInput(imageGroup.length >= 4)
    }, [imageGroup.length])

    const updateImage = (e) => {
        const file = e.target.files[0];
        console.log(file)
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
        </>
    )
}

export default UploadPicture;
