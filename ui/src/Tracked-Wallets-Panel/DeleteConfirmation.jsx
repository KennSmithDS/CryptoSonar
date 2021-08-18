import React from 'react';
import { Modal, Button } from "react-bootstrap";
import './TrackedWalletsPanel.css';

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, message }) => {
    return (
        <Modal show={showModal} onHide={hideModal} className="confirm-delete-container">
            <Modal.Header closeButton>
                <Modal.Title>Delete Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body><div>{message}</div></Modal.Body>
            <Modal.Footer>
                <Button className="cancel-delete" onClick={hideModal}>
                    Cancel
                </Button>
                <Button className="confirm-delete" onClick={() => confirmModal(id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmation;

// className="alert alert-danger"