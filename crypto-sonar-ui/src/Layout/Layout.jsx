import React from 'react'
import './Layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'react-bootstrap';


export const Layout = () => {
  return (
    <Container>
      <Row>
        <Col className="NavBar" md={12}>
          NavBar
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Row>
            <Col className="tracked-wallet" md={12}>
              tracked-wallet
            </Col>
          </Row>
        </Col>
        <Col md={9}>
          <Row>
            <Col className="alerts-panel" md={12}>
              alerts-panel
            </Col>
          </Row>
          <Row>
            <Col className="resources-panel" md={12}>
              resources-panel
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
