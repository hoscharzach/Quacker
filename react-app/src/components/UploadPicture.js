import React, { useEffect, useState } from "react";
import './images.css'
import uploadImageIcon from '../images/imageuploadsvg.svg'
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../store/images";
import { addError, removeErrors } from "../store/session";
import { IconButton } from "@mui/material";


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
                setHideImageInput(true)
                const errors = await dispatch(uploadImage(image));
                setHideImageInput(false)
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

            {/* <button */}
            <IconButton
                disabled={hideImageInput}
                id="file-select"
                onClick={handleFileClick}
                sx={{
                    '&:hover': {
                        backgroundColor: 'rgba(29, 155, 240, .1)'
                    }
                }}>

                <img src={uploadImageIcon} alt="" ></img>
            </IconButton>
            {/* </button> */}
        </>
    )
}

export default UploadPicture;
