import React from 'react';
import { Container } from 'react-bootstrap';
import AlertTable from './AlertTable';

export function AlertsPanel(props) {
  return (
    <div>
      <h2>Trading Alerts</h2>
      <Container>
        <AlertTable />
      </Container>
    </div>
  );
}

export default AlertsPanel;