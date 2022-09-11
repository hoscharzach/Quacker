import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../context/Modal'
import { clearImages } from '../store/images'
import CreatePost from './home/CreatePost'
import EditPost from './EditPostModal/EditPost'

export default function CreatePostModal({ post }) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button onClick={() => setShowModal(true)}>Quack</button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    dispatch(clearImages())
                }
                }>
                    {
                        post ? <EditPost setShowModal={setShowModal} post={post} /> : <CreatePost setShowModal={setShowModal} />
                    }

                </Modal>
            )}
        </>
    )
}
