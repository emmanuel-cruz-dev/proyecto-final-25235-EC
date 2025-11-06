import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileSidebar from "../components/ui/user/ProfileSidebar";
import ProfileMainContent from "../components/ui/user/ProfileMainContent";

function Profile() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileMainContent />;
      case "favorites":
        return <div>Favoritos</div>;
      case "orders":
        return <div>Pedidos</div>;
      default:
        return <ProfileMainContent />;
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4" id="profile">
      <Row>
        <Col lg={3} className="mb-4">
          <ProfileSidebar
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
        </Col>

        <Col lg={9}>{renderSection()}</Col>
      </Row>
    </Container>
  );
}

export default Profile;
