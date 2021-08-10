import React from 'react'
import {Modal, Button, Container} from 'react-bootstrap'

export function AccountSettings({ showModal, setShowModal }) {
  const handleClose = () => setShowModal(false);
  
  return (
    <>
      {showModal ?
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <h5>Clear Tracking:</h5>
              <Button variant="secondary">Clear Wallet-Tracking</Button>
            </Container>
            <Container>
              <h5>Other:</h5>
              <Button variant='danger'>Delete Account</Button>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      : null}
    </>
  );
}

export default AccountSettings
