import React, { useState, useEffect } from 'react'
import { ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import {GET_USER_WALLETS} from '../utils/queries/graphqlQueries'
import { useQuery } from '@apollo/client'

export function ListWallets(props) {
  const [walletList, setWalletList] = useState([])

  const { data, refetch } = useQuery(GET_USER_WALLETS, {
    variables: {id: props.userID },
    onCompleted: (d) => setWalletList(data.user.wallets),
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  });

  const handleClick = (val) => {
    props.setSelected(val)
  }

  const renderTooltip = (wallet) => (
    <Tooltip id="button-tooltip" {...props}>
      {wallet.address}
    </Tooltip>
  );

  // TODO: item only remains active after a second click on the same item, prefer only a single click.
  const ItemizedWallets = () => {
    return(
      walletList.map((wallet, i)  => (
        <OverlayTrigger
          placement="top"
          delay={{ show: 250}}
          overlay={renderTooltip(wallet)}
        >            
          <ListGroup.Item 
            action 
            onClick={()=>handleClick(wallet)} 
            variant="light" 
            key={i}
          >
            {wallet.alias}
          </ListGroup.Item>
        </OverlayTrigger>
      ))  
    )
  }

  useEffect( () =>{
    if(props.refetch){
      refetch();
      props.setWalletList(walletList)
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
