import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../context/Modal'
import { clearImages } from '../store/images'
import CreatePost from './home/CreatePost'

export default function CreatePostModal({ location, parentId }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    let text

    if (location === 'nav' || location === 'main') {
        text = 'Quack'
    } else if (location === 'card') {
        text = 'Reply'
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>{text}</button>
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
