import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { DashCircle } from 'react-bootstrap-icons'
import { useMutation } from '@apollo/client'
import { REMOVE_WALLET } from '../utils/queries/graphqlQueries'
import DeleteConfirmation from './DeleteConfirmation'

export const DeleteWalletButton = (props) => {
  const { id } = props.selectedWallet

  const [delWalFunc, { loading, error }] = useMutation(REMOVE_WALLET);

  // const [walletToDelete, setWalletToDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const showDeleteModal = (id) => {
    setDisplayConfirmationModal(true);
    setDeleteMessage(`Are you sure you no longer want to track this address?: ${id.address}`)
  }

  // Check id and send data
  const handleClick = (val) => {
    if (id) {
      SendData(val);
      props.submitted(true)
    }
  }

  // Actual function to delete data via GraphQL
  const SendData = (val) => {
    delWalFunc({
      variables: {
        id: val
      },
    });
    if (loading) return console.log('Submitting...');
    if (error) return console.log(`Submission error! ${error.message}`);
    setDisplayConfirmationModal(false);
  }

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => showDeleteModal(id)}
      >
        <DashCircle size={props.size} className="delete-wallet" />
      </Button>
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={handleClick} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
    </>
  )
}
export default DeleteWalletButton
