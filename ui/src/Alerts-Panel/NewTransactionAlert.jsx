import Toast from 'react-bootstrap/Toast'
import React, { useState } from 'react';

export function NewTransactionAlert(props) {

    const [show, setShow] = useState(false);

    return (
        <Toast className="new-transaction" onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Header>
                <strong>Wallet Transaction Update</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )
}

export default NewTransactionAlert;