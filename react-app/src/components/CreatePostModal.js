import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../context/Modal'
import { clearImages } from '../store/images'
import CreatePost from './home/CreatePost'

export default function CreatePostModal({ parentId }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button onClick={() => setShowModal(true)}>Reply</button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    dispatch(clearImages())
                }
                }>
                    <CreatePost parentId={parentId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
