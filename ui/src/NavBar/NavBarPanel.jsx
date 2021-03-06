import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavBarPanel.css'
import {Broadcast} from 'react-bootstrap-icons';

import { AccountSettings } from './AccountSettings'

export function NavBarPanel(props) {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(prev => !prev)
  }
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto Brand">
            <Navbar.Brand href="/">
            <Broadcast size={50}/> CryptoSONAR
            </Navbar.Brand>
          </Nav>
          <Nav>
            <NavDropdown 
              title={props.user.userName} 
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item  
                onClick={openModal}
              >
                Account Settings
              </NavDropdown.Item>
              <AccountSettings
                user={props.user}
                walletList={props.walletList}
                showModal={showModal} 
                setShowModal={setShowModal}
                setRefetch={props.setRefetch} 
              />
              <NavDropdown.Divider />
              <LinkContainer to="/login">
                <NavDropdown.Item 
                onClick={()=>{localStorage.removeItem('UserCredentials')}}
              >
                Logout
              </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarPanel
