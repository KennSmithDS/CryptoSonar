import React from 'react';
import './ResourcePanel.css';
import PricePanel from '../Chart/PricePanel';

export function ResourcesPanel(props) {
  // const wallet = props.selectedWallet

  return (
    <PricePanel contractAddress={props.selectedAlert} />
  )
}

export default ResourcesPanel
