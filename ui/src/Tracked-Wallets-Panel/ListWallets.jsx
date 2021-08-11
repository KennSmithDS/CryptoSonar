import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import {GET_USER_WALLETS} from '../utils/queries/graphqlQueries'
import { useQuery } from '@apollo/client'

export function ListWallets(props) {
  const [walletList, setWalletList] = useState([])
  props.setWalletList(walletList)

  const { data, refetch } = useQuery(GET_USER_WALLETS, {
    variables: {id: props.userID },
    onCompleted: (d) => setWalletList(data.user.wallets),
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  });

  const handleClick = (val) => {
    props.setSelected(val)
  }

  // TODO: item only remains active after a second click on the same item, prefer only a single click.
  const ItemizedWallets = () => {
    return(
      walletList.map((wallet, i)  => (            
        <ListGroup.Item 
          action 
          onClick={()=>handleClick(wallet)} 
          variant="light" 
          key={i}
        >
          {wallet.alias}
        </ListGroup.Item>
      ))
    )
  }

  useEffect( () =>{
    if(props.refetch){
      refetch();
      props.setRefetch(false)
    }
  })

  return(
    <div>            
      <ListGroup 
        defaultActiveKey={"wallet-list-active-key"} 
        key={"wallet-list-key"}
      >
        <ItemizedWallets />  
      </ListGroup>
    </div>    
  )
}

export default ListWallets
