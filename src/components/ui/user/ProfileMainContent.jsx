import React, { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { AuthContext } from "../../../hooks/useAuth";
import { useUpdateUser } from "../../../hooks/auth/useUpdateUser";

function ProfileMainContent() {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { updateUser, loading } = useUpdateUser();

  const [profileData, setProfileData] = useState({
    id: user?.id || "",
    email: user?.email || "",
    password: user?.password || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    avatar: user?.avatar || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(profileData);
      updateUserProfile(updatedUser);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (passwordData.oldPassword !== user?.password) {
      alert("La contraseña anterior es incorrecta");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("La nueva contraseña y la confirmación no coinciden");
      return;
    }

    if (passwordData.newPassword === passwordData.oldPassword) {
      alert("La nueva contraseña no puede ser la misma que la anterior");
      return;
    }

    try {
      const updatedUser = await updateUser({
        ...profileData,
        password: passwordData.newPassword,
      });

      updateUserProfile(updatedUser);
      setShowPasswordChange(false);
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      alert("Error al cambiar la contraseña");
    } finally {
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-1">Mi Perfil</h4>
              <p className="text-muted mb-0">
                Toda tu información de cuenta en un solo lugar
              </p>
            </div>
            <Button
              variant="outline-primary"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
            >
              {showPasswordChange
                ? "Ocultar cambiar contraseña"
                : "Cambiar contraseña"}
            </Button>
          </header>

          <Form onSubmit={handleProfileUpdate}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="text-muted small" htmlFor="firstName">
                  Nombre
                </Form.Label>
                <Form.Control
                  id="firstName"
                  type="text"
                  className="bg-light border-0"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label className="text-muted small" htmlFor="lastName">
                  Apellido
                </Form.Label>
                <Form.Control
                  id="lastName"
                  type="text"
                  className="bg-light border-0"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      lastName: e.target.value,
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label className="text-muted small" htmlFor="email">
                  Email
                </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  className="bg-light border-0"
                  autoComplete="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      email: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>

            <Button type="submit" variant="primary" className="mt-4">
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {showPasswordChange && (
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <h4 className="fw-bold mb-1">Cambiar Contraseña</h4>
            <p className="text-muted mb-4">Actualiza tu contraseña</p>

            <Form onSubmit={handlePasswordChange}>
              <Row className="g-3">
                {["old", "new", "confirm"].map((field) => (
                  <Col md={6} key={field}>
                    <Form.Label className="text-muted small" htmlFor={field}>
                      {field === "old"
                        ? "Contraseña anterior"
                        : field === "new"
                        ? "Contraseña nueva"
                        : "Confirmar contraseña"}
                    </Form.Label>
                    <div className="input-group">
                      <Form.Control
                        id={field}
                        type={showPasswords[field] ? "text" : "password"}
                        className="bg-light border-0"
                        placeholder="********"
                        value={passwordData[`${field}Password`]}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            [`${field}Password`]: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="light"
                        className="border-0"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            [field]: !showPasswords[field],
                          })
                        }
                      >
                        {showPasswords[field] ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
              <Button type="submit" variant="primary" className="mt-4">
                Guardar Cambios
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default ProfileMainContent;
