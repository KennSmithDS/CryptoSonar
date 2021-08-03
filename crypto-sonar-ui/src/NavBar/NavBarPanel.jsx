import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar >
      <Container>
        <Navbar.Brand >CryptoSONAR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto">
          <NavDropdown title="UserName Here" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.3">Account Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
          </NavDropdown>
          </Nav>
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
