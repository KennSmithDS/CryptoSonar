import React, { useState } from 'react'
import { Modal, Button, Container, Form } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { ADD_WALLET } from '../utils/queries/graphqlQueries'
import { PlusCircle } from 'react-bootstrap-icons'


export const AddWalletItem = (props) => {
  // const { showModal, setShowModal } = props
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false);
  const [inputs, setInputs] = useState({}, []);



  const openModal = () => {
    setShowModal(prev => !prev)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    SendData(inputs);
    props.submitted(true)
    handleClose();
  }
  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const [addWalFunc, { loading, error }] = useMutation(ADD_WALLET);

  const SendData = (inputs) => {
    addWalFunc({
      variables: {
        alias: inputs.walletAlias,
        address: inputs.walletAddress,
        userId: props.userID,
      }
    })
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  }

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
                  <Form.Control
                    required
                    type="string"
                    placeholder="Wallet Address"
                    name="walletAddress"
                    onChange={handleInputChange}
                    value={inputs.walletAddress || ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddressAlias">
                  <Form.Label>
                    Address Alias:
                  </Form.Label>
                  <Form.Control
                    required
                    type="string"
                    placeholder="Address Alias"
                    name="walletAlias"
                    onChange={handleInputChange}
                    value={inputs.walletAlias || ''}
                  />
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
      <Button variant="outline-secondary" onClick={openModal}>
        <PlusCircle size={props.size} className="add-wallet" />
      </Button>
    </>
  )
}

export default AddWalletItem
