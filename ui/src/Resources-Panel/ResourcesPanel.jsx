import React from 'react';
import './ResourcePanel.css';

export function ResourcesPanel(props) {
  const wallet = props.selectedWallet
  return (
    <div>
      Resource Panel Here
      <h2>Resource Panel for {wallet.alias}</h2>
      <h2>({wallet.address})</h2>
    </div>
  )
}

export default ResourcesPanel
