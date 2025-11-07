import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Image } from "lucide-react";
import { AuthContext } from "../../../hooks/useAuth";

function RegisterForm() {
  const { register } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (formData.avatar && !isValidUrl(formData.avatar)) {
      newErrors.avatar = "La URL del avatar no es válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    return string.match(
      /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Preparar datos para el backend (sin confirmPassword)
      const { confirmPassword, ...dataToSend } = formData;

      // Si avatar está vacío, no se envia
      if (!dataToSend.avatar) {
        delete dataToSend.avatar;
      }

      console.log("Datos a enviar:", dataToSend);

      try {
        const newUser = await register(dataToSend);
        console.log("Nuevo usuario:", newUser);
      } catch (error) {
        if (error.message.includes("ya está registrado")) {
          setErrors((prev) => ({
            ...prev,
            email: "Este correo ya está registrado",
          }));
        } else {
          console.error("Error al registrar usuario:", error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Nombre y Apellido */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Nombre <span className="text-danger">*</span>
          </label>
          <div className="position-relative">
            <User
              size={18}
              className="text-muted"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Juan"
              style={{ paddingLeft: "40px" }}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Apellido <span className="text-danger">*</span>
          </label>
          <div className="position-relative">
            <User
              size={18}
              className="text-muted"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Pérez"
              style={{ paddingLeft: "40px" }}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">
          Correo electrónico <span className="text-danger">*</span>
        </label>
        <div className="position-relative">
          <Mail
            size={18}
            className="text-muted"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nombre@mail.com"
            style={{ paddingLeft: "40px" }}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
      </div>

      {/* Contraseña */}
      <div className="mb-3">
        <label className="form-label">
          Contraseña <span className="text-danger">*</span>
        </label>
        <div className="position-relative">
          <Lock
            size={18}
            className="text-muted"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          />
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
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
              zIndex: 2,
            }}
          >
            {showPassword ? (
              <Eye size={20} className="text-secondary" />
            ) : (
              <EyeOff size={20} className="text-secondary" />
            )}
          </button>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
      </div>

      {/* Confirmar Contraseña */}
      <div className="mb-3">
        <label className="form-label">
          Confirmar contraseña <span className="text-danger">*</span>
        </label>
        <div className="position-relative">
          <Lock
            size={18}
            className="text-muted"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "5px",
              zIndex: 2,
            }}
          >
            {showConfirmPassword ? (
              <Eye size={20} className="text-secondary" />
            ) : (
              <EyeOff size={20} className="text-secondary" />
            )}
          </button>
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
      </div>

      {/* Avatar (opcional) */}
      <div className="mb-4">
        <label className="form-label">
          Avatar <span className="text-muted">(opcional)</span>
        </label>
        <div className="position-relative">
          <Image
            size={18}
            className="text-muted"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-120%)",
            }}
          />
          <input
            type="url"
            className={`form-control ${errors.avatar ? "is-invalid" : ""}`}
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="https://ejemplo.com/mi-foto.jpg"
            style={{ paddingLeft: "40px" }}
          />
          {errors.avatar && (
            <div className="invalid-feedback">{errors.avatar}</div>
          )}
          <small className="text-muted d-block mt-1">
            URL de tu imagen de perfil
          </small>
        </div>
      </div>

      {/* Botones */}
      <div className="d-grid gap-2">
        <button
          type="submit"
          className="btn btn-primary py-2 fw-medium"
          style={{ borderRadius: "25px" }}
        >
          Crear cuenta
        </button>
        <p className="text-muted text-center mt-3 mb-0">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;
