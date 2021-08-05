import React, { useState } from 'react'
import {Modal, Button, Container, Form} from 'react-bootstrap'


export function AddWalletItem({ showModal, setShowModal }) {
  const handleClose = () => setShowModal(false);

  const useAddWalletForm = (callback) => {
    const [inputs, setInputs] = useState({}, []);

    const handleSubmit = (event) => {
      if (event) event.preventDefault();
      callback();
      handleClose();
    }

    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
    }
    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
  }

  const addWallet = () => {
    console.log(`Wallet Added!
      Wallet: ${inputs.walletAddress}
      Alias: ${inputs.walletAlias}`);
  }

  const {inputs, handleInputChange, handleSubmit} = useAddWalletForm(addWallet);

  return (
    <>
      {showModal ?
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
          
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formWalletAddress">
                  <Form.Label>Wallet Address:</Form.Label>
                  <Form.Control required type="string" placeholder="Wallet Address" name="walletAddress" onChange={handleInputChange} value={inputs.walletAddress || ''}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddressAlias">
                  <Form.Label>Address Alias:</Form.Label>
                  <Form.Control required type="string" placeholder="Address Alias" name="walletAlias" onChange={handleInputChange} value={inputs.walletAlias || ''}/>
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
