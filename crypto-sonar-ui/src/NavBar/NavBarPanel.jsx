import React, { Component, useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { AccountSettings } from '../AccountSettings'

function NavBar() {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(prev => !prev)
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
      <Navbar.Brand>CryptoSONAR</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
          <NavDropdown title="Username" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={openModal}>Account Settings</NavDropdown.Item>
            <AccountSettings showModal={showModal} setShowModal={setShowModal} />
            <NavDropdown.Divider />
            <NavDropdown.Item  >Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export class NavBarPanel extends Component {
  render() {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
}

export default NavBarPanel
