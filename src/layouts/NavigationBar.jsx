import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center justify-content-center gap-2"
        >
          <img
            src="/nova-store.svg"
            style={{ width: "30px", height: "30px" }}
            alt="Logo de NovaStore"
            loading="lazy"
            width="200"
            height="200"
          />
          NovaStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" aria-label="Inicio">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products" aria-label="Productos">
              Productos
            </Nav.Link>

            <Nav.Link as={Link} to="/profile" aria-label="Perfil">
              Perfil
            </Nav.Link>

            <Nav.Link as={Link} to="/login" aria-label="Iniciar sesión">
              Iniciar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
