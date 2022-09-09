import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditPost from './EditPost'

export default function EditPostModal({ post }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}> <img></img></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPost post={post} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
