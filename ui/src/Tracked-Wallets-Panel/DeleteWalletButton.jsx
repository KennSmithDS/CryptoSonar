import React from 'react'
import { Button } from 'react-bootstrap'
import { DashCircle } from 'react-bootstrap-icons'
import { useMutation } from '@apollo/client'
import { REMOVE_WALLET } from '../utils/queries/graphqlQueries'

export const DeleteWalletButton = (props) => {
  const [delWalFunc, { loading, error }] = useMutation(REMOVE_WALLET);
  
  const handleClick = (val) => {
    SendData(val);
    props.submitted(true)
  }

  const SendData = (val) => {
    delWalFunc({
      variables: { 
        id: val
      },
    });
    if (loading) return console.log('Submitting...');
    if (error) return console.log(`Submission error! ${error.message}`);
  }

  return (
    <>
      <Button variant="outline-danger" onClick={()=>handleClick(props.selected)}><DashCircle size={props.size} /></Button>
    </>
  )
}
export default DeleteWalletButton
