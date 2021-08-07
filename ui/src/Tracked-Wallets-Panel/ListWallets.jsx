import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
// import {getUserWallets} from '../utils/queries/graphqlQueries'
import { gql, useQuery } from '@apollo/client'

const getUserWallets = gql`
    query GetUserWallets($id: ID) {
        user(id: $id) {
        id
        wallets {
            alias
            address
            }
        }
    }
`;

export function ListWallets(props) {
  const [walletList, setWalletList] = useState([])

  const { data, refetch } = useQuery(getUserWallets, {
    variables: {id: props.userID },
    onCompleted: (d) => setWalletList(data.user.wallets)
  });
  
  if(props.submitted){
    refetch();
  } 

  const ItemizedWallets = walletList.map((wallet, i)  => (        
    <ListGroup.Item action onClick={()=>console.log(wallet.address)} variant="light" key={i}>
      {wallet.alias}
    </ListGroup.Item>
  ))

  return(            
      <ListGroup defaultActiveKey={"wallet-list-active-key"} key={"wallet-list-key"}>
          {ItemizedWallets}     
      </ListGroup>    
  )
}

export default ListWallets
