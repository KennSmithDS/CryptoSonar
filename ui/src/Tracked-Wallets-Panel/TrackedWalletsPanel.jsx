import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { PlusCircle } from 'react-bootstrap-icons'
import './TrackedWalletsPanel.css'
import { AddWalletItem } from './AddWalletItem'
import { DeleteWalletButton } from './DeleteWalletButton'
import { ListWallets } from './ListWallets'

export function TrackedWalletsPanel(props) {
  const wallet = props.selectedWallet
  const userID = props.userID

  const [showModal, setShowModal] = useState(false)
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
        <ListWallets
          setWalletList={props.setWalletList} 
          setSelected={(val) => props.setSelectedWallet(val)} 
          refetch={refetch || props.refetch} 
          setRefetch={val=>setRefetch(val)} 
          userID={userID}
        />
      </Container>
      <Container className="add-delete-wallet">
        <Button variant="outline-secondary" onClick={openModal}>
          <PlusCircle size={BUTTON_SIZE} />
        </Button>
          <AddWalletItem 
            submitted={handleSubmitted} 
            userID={userID} 
            showModal={showModal} 
            setShowModal={setShowModal} 
          />
        <DeleteWalletButton 
          selectedWallet={wallet} 
          submitted={handleSubmitted} 
          size={BUTTON_SIZE} 
        />
      </Container>      
    </div>
  )
}

export default TrackedWalletsPanel
