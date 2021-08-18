import React, { useState } from 'react'
import { Modal, Button, Container, Form } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { UPDATE_WALLET } from '../utils/queries/graphqlQueries'
import { PencilSquare } from 'react-bootstrap-icons'


export const UpdateWalletItem = (props) => {
  const [formState, setFormState] = useState({})

  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false);

  const openModal = () => {
    if (props.selectedWallet.address) {
      setShowModal(prev => !prev)
      setFormState({
        alias: props.selectedWallet.alias,
        address: props.selectedWallet.address,
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    SendData(formState);
    props.submitted(true)
    handleClose();
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }

  const [updateWalFunc, { loading, error }] = useMutation(UPDATE_WALLET);

  const SendData = (formState) => {
    console.log(formState)
    updateWalFunc({
      variables: {
        id: props.selectedWallet.id,
        alias: formState.alias,
        address: formState.address
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
            <Modal.Title>Update Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Update Address:</Form.Label>
                  <Form.Control
                    type="text"
                    name="walletAddress"
                    onChange={handleChange}
                    defaultValue={formState.address}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="alias">
                  <Form.Label>
                    Update Alias:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="walletAlias"
                    onChange={handleChange}
                    defaultValue={formState.alias}
                  />
                </Form.Group>
                <Button className="update-submit-btn" type="submit">
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
      <Button
        variant="outline-secondary"
        onClick={openModal}
      >
        <PencilSquare size={props.size} className="update-wallet" />
      </Button>
    </>
  )
}

export default UpdateWalletItem
