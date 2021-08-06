import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './NavBarPanel.css'
import {Broadcast} from 'react-bootstrap-icons';

import { AccountSettings } from '../AccountSettings'


export function NavBarPanel() {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(prev => !prev)
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Broadcast size={50}/>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto Brand">
            <Navbar.Brand >CryptoSONAR</Navbar.Brand>
          </Nav>
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

export default NavBarPanel
