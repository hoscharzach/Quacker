import React, { useState } from 'react'
import { Modal } from '../src/context/Modal'
import CreatePost from './components/home/CreatePost'

export default function CreatePostModal({ parentId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Reply</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePost parentId={parentId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
