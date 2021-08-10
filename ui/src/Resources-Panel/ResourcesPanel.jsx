import React from 'react';
import PriceChart from './PriceChart';
import './ResourcePanel.css';

export function ResourcesPanel() {

  const testContractAddress = "0x1ad7dbe0d521ca1ae72decc06f1570aa43c781a2"

  return (
    <div classname="price-chart-container">
      <PriceChart contractAddress={testContractAddress} className="embedded-price-chart" />
    </div>
  )
}

export default ResourcesPanel
