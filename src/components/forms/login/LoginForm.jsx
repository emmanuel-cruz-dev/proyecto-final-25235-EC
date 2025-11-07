import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../../hooks/useAuth";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname || "/";

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(loginData.email, loginData.password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
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
        className="d-flex flex-column justify-content-end flex-lg-row"
        style={{ marginTop: "2rem" }}
      >
        <Button
          variant="primary"
          type="submit"
          className="px-5 py-2 flex-grow-1 flex-md-grow-0"
          style={{ borderRadius: "25px", fontWeight: "500" }}
        >
          Iniciar Sesión
        </Button>
        <p className="d-lg-none text-muted text-center mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </footer>
    </Form>
  );
}

export default LoginForm;
