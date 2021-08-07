import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

export function ListWallets(props) {
  const [walletList, setWalletList] = useState([])

  const QUERY = `query{
    user(id: "${props.userID}") {
      id
      wallets {
        alias
        address
      }
    }
  }`;

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY }),
    }).then((response) => response.json())
      .then((data) => setWalletList(data.data.user.wallets));
  });

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
