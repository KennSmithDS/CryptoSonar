import React from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'


export function AddWalletItem({ showModal, setShowModal }) {
  const handleClose = () => setShowModal(false);
    return (
    <>
      {showModal ?
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
          
            <Form>
              <Form.Group className="mb-3" controlId="formWalletAddress">
                <Form.Label>Wallet Address:</Form.Label>
                <Form.Control type="string" placeholder="Wallet Address" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddressAlias">
                <Form.Label>Address Alias:</Form.Label>
                <Form.Control type="string" placeholder="Address Alias" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

 
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

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
  )
}


export default AddWalletItem
