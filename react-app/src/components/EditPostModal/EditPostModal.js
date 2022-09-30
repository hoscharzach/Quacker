import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditPost from './EditPost'
import editIcon from '../../images/editpenicon.svg'
import { useDispatch } from 'react-redux'
import { clearImages } from '../../store/images'
import './editpost.css'

export default function EditPostModal({ post, text, variant }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    let innerText

    switch (variant) {
        case "menu":
            innerText = (
                <></>
            )

        case "single-post":
            innerText = (
                <></>
            )

        case 'reply-card':
            innerText = (
                <></>
            )

    }


    return (
        <>
            <button className='edit-post-button' onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                dispatch(clearImages())
                setShowModal(true)
            }}> <img src={editIcon} alt="" id='edit-icon'></img>{text && text}</button>
            {showModal && (
                <Modal onClose={(e) => {
                    e.stopPropagation()
                    setShowModal(false)
                }}>
                    <EditPost post={post} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
