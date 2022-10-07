import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal'
import { clearImages } from '../../store/images'
import Reply from './Reply'
import replyIcon from '../../images/replybutton.svg'
import { removeErrors } from '../../store/session'
import { Box, IconButton } from '@mui/material'
import ReplyButton from '../ReplyButton'


export default function ReplyModal({ parentId, numReplies, type }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const replyButtonStyles = {

        display: 'flex',
        alignItems: 'center',
        fill: '#8b98a5',
        '&:hover': {
            backgroundColor: 'rgba(29, 155, 240, .1)'
        },

        '&:hover *': {
            fill: '#1e9cf1',
        },
    }

    const handleClick = () => {
        dispatch(clearImages())
        dispatch(removeErrors())
        setShowModal(true)
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton sx={replyButtonStyles} onClick={handleClick}>
                    <ReplyButton sx={{ fill: '#1e9cf1' }} width={'22.5'} height={'22.5'} />
                </IconButton>
                <span style={{ color: '#8b98a5' }}>{type === 'reply' && numReplies}</span>
            </Box>
            {showModal && (
                <Modal onClose={(e) => {
                    setShowModal(false)
                }}>
                    <Reply parentId={parentId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}
