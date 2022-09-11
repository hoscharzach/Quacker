import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../context/Modal'
import { clearImages } from '../store/images'
import CreatePost from './home/CreatePost'
import EditPost from './EditPostModal/EditPost'

export default function CreatePostModal() {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <div style={{ padding: 'none' }} id="quack-modal-button" onClick={() => setShowModal(true)}><span className='navbar-text'>Quack</span></div>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    dispatch(clearImages())
                }
                }>
                    <CreatePost setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
