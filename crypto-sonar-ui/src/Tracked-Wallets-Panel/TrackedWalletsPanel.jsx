import React, { useState } from 'react'
import { ListGroup, Container, Button } from 'react-bootstrap'
import { PlusCircle, DashCircle } from 'react-bootstrap-icons'
import './TrackedWalletsPanel.css'
import { AddWalletItem } from './AddWalletItem'


const walletList = ['Wallet 1', 'Wallet 2', 'Wallet 3']

function ListWallets() {
  return(
    walletList.map(wallet => (        
      <ListGroup action defaultActiveKey={`#${wallet}`}>
        <ListGroup.Item action variant="light">
          {wallet}
        </ListGroup.Item>
      </ListGroup>
    ))
  )
}

export function TrackedWalletsPanel() {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <div class="wallets-list-panel">
      <h3>Tracked Wallets Panel </h3>
      <Container className="wallets-list-container">
        <ListWallets />
      </Container>
      <Container className="add-delete-wallet">
        <Button variant="outline-secondary" onClick={openModal}><PlusCircle size={50} /></Button>
          <AddWalletItem showModal={showModal} setShowModal={setShowModal} />
        <Button variant="outline-danger"><DashCircle size={50} /></Button>
      </Container>      
    </div>
  )
}


export default TrackedWalletsPanel
