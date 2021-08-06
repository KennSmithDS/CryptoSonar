import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

export function ListWallets() {
  const [walletList, setWalletList] = useState([])

  const userId="610a1a1029d68f47b975cfd8"
  const QUERY = `query{
    user(id: "${userId}") {
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


export default ListWallets
