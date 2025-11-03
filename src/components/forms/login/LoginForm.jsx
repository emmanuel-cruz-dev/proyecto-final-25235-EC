import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", loginData);
    // TODO agregar lógica de login
  };

  return (
    <Form onSubmit={handleLoginSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>
          Correo electrónico <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Ej. nombre@mail.com"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Form.Label className="mb-0">
            Contraseña <span className="text-danger">*</span>
          </Form.Label>
        </div>
        <div className="position-relative">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {showPassword ? (
              <Eye size={20} className="text-secondary" />
            ) : (
              <EyeOff size={20} className="text-secondary" />
            )}
          </button>
        </div>
      </Form.Group>

      <footer
        className="d-flex justify-content-end"
        style={{ marginTop: "2rem" }}
      >
        <Button
          variant="primary"
          type="submit"
          className="px-5 py-2"
          style={{ borderRadius: "25px", fontWeight: "500" }}
        >
          Iniciar Sesión
        </Button>
      </footer>
    </Form>
  );
}

export default LoginForm;
