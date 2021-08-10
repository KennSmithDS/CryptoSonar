import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import { AlertsPanel } from '../Alerts-Panel/AlertsPanel'
import { ResourcesPanel } from '../Resources-Panel/ResourcesPanel'
import { TrackedWalletsPanel } from '../Tracked-Wallets-Panel/TrackedWalletsPanel'
import { NavBarPanel } from '../NavBar/NavBarPanel'
import PricePanel from '../Chart/PricePanel'
import './Layout.css';

export const Layout = (props) => {

  return (
    <Container>
      <Row>
        <Col className="NavBar" md={12}>
          <NavBarPanel user={props.user} />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Row>
            <Col className="tracked-wallet" md={12}>
              <TrackedWalletsPanel userID={props.user.id} />
            </Col>
          </Row>
        </Col>
        <Col md={9}>
          <Row>
            <Col className="alerts-panel" md={12}>
              <AlertsPanel />
            </Col>
          </Row>
          <Row>
            <Col className="resources-panel" md={12}>
              <ResourcesPanel />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="price-chart-panel" md={12}>
          <PricePanel />
        </Col>
      </Row>
    </Container>
  )
}
