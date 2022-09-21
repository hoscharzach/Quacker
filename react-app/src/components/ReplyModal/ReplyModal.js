import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal'
import { clearImages } from '../../store/images'
import Reply from './Reply'
import replyIcon from '../../images/replybutton.svg'
import { removeErrors } from '../../store/session'


export default function ReplyModal({ parentId, numReplies, text }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button id='reply-modal-button' onClick={(e) => {
                e.stopPropagation()
                setShowModal(true)
                dispatch(clearImages())
                dispatch(removeErrors())
            }}><img id='reply-modal-reply-icon' src={replyIcon} alt=""></img><span className='num-replies-button'>{text}</span></button>
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
