import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import LoginForm from '../auth/LoginForm'
import { useDispatch } from 'react-redux'
import './loginform.css'

export default function LoginModal() {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button id='signin-button' onClick={() => { setShowModal(true) }}> Sign in</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}
