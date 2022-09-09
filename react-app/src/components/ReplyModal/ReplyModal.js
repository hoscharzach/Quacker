import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal'
import { clearImages } from '../../store/images'
import Reply from './Reply'
import replyIcon from '../../images/replybutton.svg'


export default function ReplyModal({ parentId, numReplies }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button id='reply-modal-button' onClick={() => {
                setShowModal(true)
                dispatch(clearImages())
            }}><img id='reply-modal-reply-icon' src={replyIcon} alt=""></img><span className='num-replies-button'> Reply</span></button>
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
