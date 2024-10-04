import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";

const Navbar = () => {
  return (
    <BootstrapNavbar bg="light" expand="md">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src="/logo.png"
            alt="News Portal Logo"
            style={{ width: "50px", height: "50px" }}
            className="d-inline-block align-top"
          />{" "}
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <i className="bi bi-house-door"></i> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/news">
              <i className="bi bi-newspaper"></i> Latest News
            </Nav.Link>
            <Nav.Link as={Link} to="/events">
              <i className="bi bi-calendar-event"></i> Events
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              <i className="bi bi-person-circle"></i> Contact
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
