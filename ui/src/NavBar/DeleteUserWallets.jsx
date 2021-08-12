import React from 'react'
import { Button, Container} from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { REMOVE_WALLET } from '../utils/queries/graphqlQueries'

export function DeleteUserWallets(props) {
  
  const [delUserWallets, { loading, error }] = useMutation(REMOVE_WALLET);

  function handleClearWallet(){
    sendClearWalletData()
    props.setRefetch(true)
    props.handleClose(false);
  }

    // TODO: Sometimes works perfectly fine, 
    // other times leaves all but one wallet deleted.
    // leaving the console.log below seems to temporarily resolve this issue..
  function sendClearWalletData() {    
    const walletListIds = props.walletList.map(wallet => wallet.id)
    console.log(walletListIds.length)
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

  return (
    <>
      <Container>
        <h5>Clear Tracking:</h5>
        <Button 
          variant="secondary" 
          onClick={handleClearWallet}
        >
          Clear Wallet-Tracking
        </Button>
        </Container>
    </>  
  );
}

export default DeleteUserWallets
