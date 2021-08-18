import Toast from 'react-bootstrap/Toast'
import React from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer'
import './Alerts.css'

export function NewTransactionAlert(props) {

    return (
        <ToastContainer position="top-center">
            <Toast bg='dark' className="new-transaction" onClose={() => props.setShowWarning(false)} show={props.showWarning} delay={5000} autohide>
                <Toast.Header>
                    <strong>Wallet Transaction Update</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default NewTransactionAlert;