import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ShoppingCart, ChevronDown, User, LogOut } from "lucide-react";
import { AuthContext } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

function NavigationBar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { getCartItemsCount } = useCart();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  const handleNavigate = () => {
    setShowMenu(false);
    navigate("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src="/nova-store.svg"
            style={{ width: "30px", height: "30px" }}
            alt="Logo de NovaStore"
            loading="lazy"
          />
          NovaStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/" aria-label="Inicio">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products" aria-label="Productos">
              Productos
            </Nav.Link>

            {isAuthenticated && (
              <Nav.Link
                as={Link}
                to="/cart"
                className="cart__items-container"
                aria-label="Carrito"
                title="Ir al carrito"
              >
                <ShoppingCart size={20} className="me-2" />
                {getCartItemsCount() > 0 && (
                  <p className="cart__items-badge">{getCartItemsCount()}</p>
                )}
              </Nav.Link>
            )}

            {isAuthenticated && user ? (
              <div ref={menuRef} className="position-relative">
                <button
                  onClick={toggleMenu}
                  className="d-flex align-items-center gap-2 border-0 bg-transparent text-white"
                  aria-label="Abrir menú de usuario"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="rounded-circle overflow-hidden border border-light"
                    style={{ width: "36px", height: "36px" }}
                  >
                    <img
                      src={user.avatar}
                      alt={`${user.name} ${user.lastName} avatar`}
                      className="w-100 h-100 object-fit-cover"
                      loading="lazy"
                    />
                  </div>
                  <ChevronDown
                    size={18}
                    className="bg-dark rounded-circle"
                    style={{
                      marginLeft: "-18px",
                      marginTop: "22px",
                      width: "20px",
                      height: "20px",
                      padding: "2px",
                    }}
                  />
                </button>

                {showMenu && (
                  <div
                    className="user-menu position-absolute bg-dark text-white p-2 rounded shadow mt-1"
                    style={{
                      right: 0,
                      top: "48px",
                      width: "192px",
                      zIndex: 1000,
                    }}
                  >
                    <div className="px-2 py-1 border-bottom border-secondary d-flex align-items-center pb-2">
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="rounded-circle overflow-hidden border border-light me-2 flex-shrink-0"
                        style={{ width: "22px", height: "22px" }}
                        loading="lazy"
                      />
                      {user.firstName} {user.lastName}
                    </div>
                    <button
                      onClick={handleNavigate}
                      className="user-menu__button mt-2"
                    >
                      <User size={18} className="me-2 text-white" />
                      Ver perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="user-menu__button"
                    >
                      <LogOut size={18} className="me-2 text-white" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Nav.Link as={Link} to="/login" aria-label="Iniciar sesión">
                Iniciar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
