import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import {GET_USER_WALLETS} from '../utils/queries/graphqlQueries'
import { useQuery } from '@apollo/client'

export function ListWallets(props) {
  const [walletList, setWalletList] = useState([])

  const { data, refetch } = useQuery(GET_USER_WALLETS, {
    variables: {id: props.userID },
    onCompleted: (d) => setWalletList(data.user.wallets)
  });
  
  if(props.submitted){
    refetch();
  } 

  const ItemizedWallets =() => {
    return(
      walletList.map((wallet, i)  => (        
        <ListGroup.Item action onClick={()=>console.log(wallet.address)} variant="light" key={i}>
          {wallet.alias}
        </ListGroup.Item>
      ))
    )
  }

  return(
    <div>            
      <ListGroup defaultActiveKey={"wallet-list-active-key"} key={"wallet-list-key"}>
          <ItemizedWallets />  
      </ListGroup>
    </div>    
  )
}

export default ListWallets
