import React, { useEffect, useState } from "react";
import './images.css'
import uploadImageIcon from '../images/imageuploadsvg.svg'
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../store/images";
import { addError, removeErrors } from "../store/session";
import { useRef } from "react";
import { nanoid } from "nanoid";


const UploadPicture = () => {

    const staging = useSelector(state => state.images.staging)
    const imageGroup = Object.values(staging)

    const [image, setImage] = useState(null);
    const [hideImageInput, setHideImageInput] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {

        if (imageGroup.length >= 4) {
            return
        }
        else if (image) {
            (async () => {
                dispatch(removeErrors())
                const errors = await dispatch(uploadImage(image));
                if (errors) {
                    dispatch(addError(errors))
                }
            })()
        }
    }, [image, dispatch])

    useEffect(() => {
        return () => dispatch(removeErrors())
    }, [])

    useEffect(() => {
        setHideImageInput(imageGroup.length >= 4)
    }, [imageGroup.length])

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        e.target.value = null
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

            <button
                disabled={hideImageInput}
                id="file-select" onClick={handleFileClick} >
                <img src={uploadImageIcon} alt="" ></img>
            </button>
        </>
    )
}

export default UploadPicture;
