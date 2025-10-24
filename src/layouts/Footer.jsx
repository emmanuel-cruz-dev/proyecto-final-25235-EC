import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-black text-white text-center py-3">
      <Container>
        <p className="mb-0 small">
          © 2025 E-Shop · Desarrollado por{" "}
          <a
            href="https://emmanuel-cruz.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white footer__developer-link"
            aria-label="Emmanuel Cruz"
            title="Emmanuel Cruz Portfolio"
          >
            Emmanuel
          </a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
