import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal'
import { clearImages } from '../../store/images'
import Reply from './Reply'


export default function ReplyModal({ parentId, numReplies }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button onClick={() => setShowModal(true)}>Reply {numReplies}</button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    dispatch(clearImages())
                }}>
                    <Reply parentId={parentId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
