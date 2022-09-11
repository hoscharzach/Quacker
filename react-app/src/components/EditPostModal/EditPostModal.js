import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditPost from './EditPost'
import editIcon from '../../images/editpenicon.svg'
import { useDispatch } from 'react-redux'
import { clearImages } from '../../store/images'
import './editpost.css'

export default function EditPostModal({ post }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button className='edit-post-button' onClick={() => {
                dispatch(clearImages())
                setShowModal(true)
            }}> <img src={editIcon} alt="" id='edit-icon'></img></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPost post={post} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
