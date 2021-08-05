import React, { useState, useEffect } from 'react'
import { ListGroup, Container, Button } from 'react-bootstrap'
import { PlusCircle, DashCircle } from 'react-bootstrap-icons'
import './TrackedWalletsPanel.css'
import { AddWalletItem } from './AddWalletItem'

const QUERY = `query{
  user(id: "610a1a1029d68f47b975cfd8") {
    id
    wallets {
      alias
      address
    }
  }
}`;

function ListWallets() {
  const [walletList, setWalletList] = useState([])
  useEffect(() => { 
    fetch(process.env.REACT_APP_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY }),
  }).then((response) => response.json())
    .then((data) => setWalletList(data.data.user.wallets));
  }, []);

  // walletList.map((walletItem)=> console.log(`alias: ${walletItem.alias} address:${walletItem.address}`))

  return(
    walletList.map(wallet => (        
      <ListGroup defaultActiveKey={`#${wallet.address}`} key={`#${wallet.address}`}>
        <ListGroup.Item action variant="light">
          {wallet.alias}
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
    <div >
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
