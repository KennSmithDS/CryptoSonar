import React from 'react'
import {Modal, Button, Container} from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { REMOVE_WALLET } from '../utils/queries/graphqlQueries'

export function AccountSettings(props) {
  const handleClose = () => props.setShowModal(false);
  
  const [delUserWallets, { loading, error }] = useMutation(REMOVE_WALLET);

  function handleClearWallet(){
    sendClearWalletData()
    // Trigger walletList refresh
    // close modal
  }

  function sendClearWalletData() {
    const walletListIds = props.walletList.map(wallet => wallet.id)
    for(let i=0; i < walletListIds.length; i++) {
      delUserWallets({
        variables: { 
          id: walletListIds[i]
        },
      });
      if (loading) return console.log('Submitting...');
      if (error) return console.log(`Submission error! ${error.message}`);
    }
  }

  function handleDeleteAccount(props) {

  }
  
  return (
    <>
      {props.showModal ?
        <Modal show={props.showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <h5>Clear Tracking:</h5>
              <Button 
                variant="secondary" 
                onClick={handleClearWallet}
              >
                Clear Wallet-Tracking
              </Button>
            </Container>
            <Container>
              <h5>Other:</h5>
              <Button 
                variant='danger' 
                onClick={()=>handleDeleteAccount}
              >
                Delete Account
              </Button>
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
