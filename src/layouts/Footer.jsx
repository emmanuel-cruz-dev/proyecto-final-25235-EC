import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Clock,
} from "lucide-react";
import ECLogo from "../assets/e-logo.avif";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer bg-black text-white border-top">
      <Container className="py-4">
        <Row className="g-4 pt-3">
          <Col xs={12} md={6} lg={3}>
            <header className="mb-3">
              <h4 className="fw-bold mb-3">NovaStore</h4>
              <p className="mb-2 fw-semibold">Atención al cliente:</p>
              <p className="mb-0">0810-222-2800</p>
            </header>

            <div className="d-flex gap-3 mt-3">
              <a
                href="#"
                className="text-white hover-primary"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-white hover-primary"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-white hover-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="text-white hover-primary"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <h6 className="fw-bold mb-3">Atención al cliente</h6>
            <div className="d-flex align-items-center mb-2">
              <Phone size={18} className="me-2 text-primary" />
              <ul className="small list-unstyled">
                <li>0800 122 0338</li>
                <li>0810 999 3728</li>
              </ul>
            </div>
            <div className="d-flex align-items-start mt-3">
              <Clock size={18} className="me-2 text-primary mt-1" />
              <ul className="small list-unstyled">
                <li>LU-VI de 09 a 18</li>
                <li>SA de 9 a 13</li>
              </ul>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <h6 className="fw-bold mb-3">Venta telefónica</h6>
            <div className="d-flex align-items-center mb-2">
              <Phone size={18} className="me-2 text-primary" />
              <ul className="small list-unstyled">
                <li>0810 333 8700</li>
                <li>Lu- Mier de 08 a 23</li>
              </ul>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <h6 className="fw-bold mb-3">Servicios a empresas</h6>
            <p className="small mb-0">Ventas corporativas</p>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col xs={12} lg={8} className="mb-3 mb-lg-0">
            <p className="mb-1 small fw-semibold">
              Copyright © 2025 NovaStore (NOVASTORE S.A CUIT 33-70871199-9)
              Todos los derechos reservados
            </p>
            <p className="mb-0 small" style={{ color: "#6c757d" }}>
              Las imágenes son meramente ilustrativas; los precios y stock
              pueden variar sin previo aviso.
            </p>
          </Col>

          <Col xs={12} lg={4} style={{ textAlign: "right" }}>
            <p className="mb-0 small">
              Argentina · Desarrollado por{" "}
              <a
                href="https://emmanuel-cruz.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white footer__developer-link"
                aria-label="Emmanuel Cruz"
                title="Emmanuel Cruz Portfolio"
              >
                <img
                  src={ECLogo}
                  alt="Emmanuel Cruz Logo"
                  style={{
                    width: "1.4rem",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  width="320"
                  height="320"
                />
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
