import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import { AlertsPanel } from '../Alerts-Panel/AlertsPanel'
import { ResourcesPanel } from '../Resources-Panel/ResourcesPanel'
import { TrackedWalletsPanel } from '../Tracked-Wallets-Panel/TrackedWalletsPanel'
import { NavBarPanel } from '../NavBar/NavBarPanel'
import PricePanel from '../Chart/PricePanel'
import './Layout.css';

export const Layout = (props) => {
  const [selectedWallet, setSelectedWallet] = useState({})
  const [walletList, setWalletList] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)

  return (
    <Container>
      <Row>
        <Col className="NavBar" md={12}>
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
            <Col className="tracked-wallet" md={12}>
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
            <Col className="alerts-panel" md={12}>
              <AlertsPanel selectedWallet={selectedWallet}
                setSelectedAlert={(val) => setSelectedAlert(val)}
              />
            </Col>
          </Row>
          <Row>
            <Col className="resources-panel" md={12}>
              <ResourcesPanel selectedWallet={selectedWallet} selectedAlert={selectedAlert} />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <Row>
        <Col className="price-chart-panel" md={12}>
          <PricePanel contractAddress={selectedAlert} />
        </Col>
      </Row> */}
    </Container>
  )
}
