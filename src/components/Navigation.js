import React from 'react'
import {Container, Button, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutUserMutation} from '../services/appApi';
import logo from '../assets/logo.png'
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state)=> state.user);
  const [logoutUser] = useLogoutUserMutation(); 

 async function handleLogout(e){
  e.preventDefault();
  await logoutUser(user);
  // redirect to home page
  window.location.replace("/");
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand>
          <img src={logo} alt='logo' className='logo-img'/>
        </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
            <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            )}
            <LinkContainer to="/chat">
            <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {user && (
            <NavDropdown title={
              <>
              <img src={user.picture} style={{width:30, height:30, marginRight:10, objectFit:'cover', borderRadius:'50%'}} />
              {user.name}
              </>
            }
            id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation;