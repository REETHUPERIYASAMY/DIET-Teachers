import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';

const Navbar = ({ user }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <BootstrapNavbar.Brand href="/">
          DIET Teacher Training Platform
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#" className="text-white">
              <i className="bi bi-person-circle me-2"></i>
              {user.name} ({user.role})
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="text-white">
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;