import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditPost from './EditPost'
import editIcon from '../../images/editpenicon.svg'
import { useDispatch } from 'react-redux'
import { clearImages } from '../../store/images'
import './editpost.css'
import { MenuItem } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

export default function EditPostModal({ anchorEl, setAnchorEl, post }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button onClick={() => setShowModal(true)}></button>
            {showModal && (
                <Modal onClose={(e) => {
                    e.stopPropagation()
                    setShowModal(false)
                }}>
                    <EditPost post={post} showModal={true} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
