import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import { AlertsPanel } from '../Alerts-Panel/AlertsPanel'
import { PricePanel } from '../Chart/PricePanel';
import { TrackedWalletsPanel } from '../Tracked-Wallets-Panel/TrackedWalletsPanel'
import { NavBarPanel } from '../NavBar/NavBarPanel'
import './Layout.css';

export const Layout = (props) => {
  const [selectedWallet, setSelectedWallet] = useState({})
  const [walletList, setWalletList] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)

  return (
    <Container fluid className="app-container">
      <Row>
        <Col className="NavBar">
          <NavBarPanel
            user={props.user}
            walletList={walletList}
            setRefetch={setRefetch}
          />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Row>
            <Col className="tracked-wallet">
              <TrackedWalletsPanel
                refetch={refetch}
                setWalletList={setWalletList}
                userID={props.user.id}
                selectedWallet={selectedWallet}
                setSelectedWallet={(val) => setSelectedWallet(val)}
              />
            </Col>
          </Row>
        </Col>
        <Col md={9}>
          <Row>
            <Col className="alerts-panel">
              <AlertsPanel selectedWallet={selectedWallet}
                setSelectedAlert={(val) => setSelectedAlert(val)}
              />
            </Col>
          </Row>
          <Row>
            <Col className="price-panel">
              <PricePanel contractAddress={selectedAlert} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
