import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import { DeleteUserAccount } from './DeleteUserAccount';
import { DeleteUserWallets } from './DeleteUserWallets';

export function AccountSettings(props) {
  const handleClose = () => props.setShowModal(false);
  
 
  return (
    <>
      {props.showModal ?
        <Modal show={props.showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DeleteUserWallets 
              setRefetch={props.setRefetch}
              handleClose={handleClose}
              walletList={props.walletList}
            />
            <p/>
            <DeleteUserAccount 
              user={props.user}
            />
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
