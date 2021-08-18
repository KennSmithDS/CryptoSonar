import Toast from 'react-bootstrap/Toast'
import React from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import './Alerts.css'

export function InvalidWalletAlert(props) {

    return (
        <ToastContainer position="top-center">
            <Toast bg='dark' className="invalid-wallet" onClose={() => props.setShowWarning(false)} show={props.showWarning} delay={5000} autohide>
                <Toast.Header>
                    <strong>Wallet Warning</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default InvalidWalletAlert;