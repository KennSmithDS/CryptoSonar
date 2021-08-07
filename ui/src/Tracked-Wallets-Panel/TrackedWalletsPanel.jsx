import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { PlusCircle, DashCircle } from 'react-bootstrap-icons'
import './TrackedWalletsPanel.css'
import { AddWalletItem } from './AddWalletItem'
import { ListWallets } from './ListWallets'

export function TrackedWalletsPanel(props) {
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  function handleSubmitted(val){
    setSubmitted(val)
  }

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <div>
      <h3>Tracked Wallets Panel </h3>
      <Container className="wallets-list-container">
        <ListWallets submitted={submitted} userID={props.userID}/>
      </Container>
      <Container className="add-delete-wallet">
        <Button variant="outline-secondary" onClick={openModal}><PlusCircle size={50} /></Button>
          <AddWalletItem submitted={handleSubmitted} userID={props.userID} showModal={showModal} setShowModal={setShowModal} />
        <Button variant="outline-danger"><DashCircle size={50} /></Button>
      </Container>      
    </div>
  )
}

export default TrackedWalletsPanel
