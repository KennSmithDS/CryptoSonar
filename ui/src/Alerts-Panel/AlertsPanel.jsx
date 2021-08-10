import React from 'react';
import { Container } from 'react-bootstrap';
import AlertTable from './AlertTable';

export function AlertsPanel(props) {
  const wallet = props.selectedWallet
  return (
    <div>
      <h2>Trading Alerts for {wallet.alias}</h2>
      <h2>({wallet.address})</h2>
      <Container>
        <AlertTable />
      </Container>
    </div>
  );
}

export default AlertsPanel;