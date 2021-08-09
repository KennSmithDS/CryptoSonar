import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { PlusCircle } from 'react-bootstrap-icons'
import './TrackedWalletsPanel.css'
import { AddWalletItem } from './AddWalletItem'
import { DeleteWalletButton } from './DeleteWalletButton'
import { ListWallets } from './ListWallets'

export function TrackedWalletsPanel(props) {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState('');
  const [refetch, setRefetch] = useState(false);

  function handleSubmitted(val){
    setRefetch(val)
  }

  const openModal = () => {
    setShowModal(prev => !prev)
  }

const BUTTON_SIZE=45
  return (
    <div>
      <h3>Tracked Wallets Panel </h3>
      <Container className="wallets-list-container">
        <ListWallets selected={selected} setSelected={(val) => setSelected(val)} refetch={refetch} setRefetch={val=>setRefetch(val)} userID={props.userID}/>
      </Container>
      <Container className="add-delete-wallet">
        <Button variant="outline-secondary" onClick={openModal}><PlusCircle size={BUTTON_SIZE} /></Button>
          <AddWalletItem submitted={handleSubmitted} userID={props.userID} showModal={showModal} setShowModal={setShowModal} />
        <DeleteWalletButton selected={selected} submitted={handleSubmitted} size={BUTTON_SIZE} />
      </Container>      
    </div>
  )
}

export default TrackedWalletsPanel
