import React, { useState, useContext } from "react";
import {
  User,
  Heart,
  ShoppingBag,
  LogOut,
  Eye,
  EyeOff,
  Camera,
} from "lucide-react";
import { AuthContext } from "../hooks/useAuth";
import { useUpdateUser } from "../hooks/auth/useUpdateUser";
import AvatarUpdateModal from "../components/modals/AvatarUpdateModal";

function Profile() {
  const { user, logout, updateUserProfile } = useContext(AuthContext);
  const { updateUser, loading } = useUpdateUser();

  // Estados para el formulario de perfil
  const [profileData, setProfileData] = useState({
    id: user?.id || "",
    email: user?.email || "",
    password: user?.password || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    avatar: user?.avatar || "",
  });

  const [newAvatarUrl, setNewAvatarUrl] = useState(user?.avatar || "");
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Estados para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Estados para mostrar/ocultar contraseñas
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Estado para cambiar entre vista de perfil y cambio de contraseña
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Estado del menú activo
  const [activeMenu, setActiveMenu] = useState("profile");

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
      console.log("Contraseña cambiada exitosamente");

      setShowPasswordChange(false);
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      alert("Error al cambiar la contraseña");
      return;
    } finally {
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleAvatarChange = async () => {
    if (!newAvatarUrl) {
      alert("Por favor selecciona una URL de imagen válida");
      return;
    }

    if (newAvatarUrl === profileData.avatar) {
      setShowAvatarModal(false);
      return;
    }

    try {
      setProfileData((prev) => ({
        ...prev,
        avatar: newAvatarUrl,
      }));

      const updatedUser = await updateUser({
        ...profileData,
        avatar: newAvatarUrl,
      });

      updateUserProfile(updatedUser);
      console.log("Avatar actualizado exitosamente");

      setShowAvatarModal(false);
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
      alert("Error al actualizar el avatar");

      setNewAvatarUrl(profileData.avatar);
    }
  };

  const menuItems = [
    { id: "profile", icon: User, label: "Mi Perfil" },
    { id: "list", icon: Heart, label: "Mis Listas" },
    { id: "orders", icon: ShoppingBag, label: "Mis Pedidos" },
    { id: "logout", icon: LogOut, label: "Cerrar Sesión" },
  ];

  const handleMenuClick = (menuId) => {
    if (menuId === "logout") {
      if (window.confirm("Are you sure you want to logout?")) {
        logout();
      }
    } else {
      setActiveMenu(menuId);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3">
          <div
            className={`card border-0 shadow-sm mb-4 ${
              loading ? "is-loading-pulse" : ""
            }`}
          >
            <div className="card-body text-center py-4">
              {/* Avatar */}
              <div className="mb-3 position-relative d-inline-block">
                <img
                  src={profileData.avatar || "https://placehold.it/150x150"}
                  alt="User Avatar"
                  className="rounded-circle border border-3 border-light shadow"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setNewAvatarUrl(profileData.avatar);
                    setShowAvatarModal(true);
                  }}
                />

                <button
                  className="position-absolute bottom-0 end-0 bg-white rounded-circle shadow border border-2 border-light d-flex align-items-center justify-content-center"
                  style={{ width: "36px", height: "36px", cursor: "pointer" }}
                  onClick={() => {
                    setNewAvatarUrl(profileData.avatar);
                    setShowAvatarModal(true);
                  }}
                >
                  <Camera size={20} className="text-primary" />
                </button>
              </div>

              {/* User Info */}
              <h5 className="mb-1 fw-bold">
                {user?.firstName} {user?.lastName}
              </h5>
              <p className="text-muted small mb-4">{user?.email}</p>

              {/* Menu Items */}
              <div className="list-group list-group-flush">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className={`list-group-item list-group-item-action border-0 d-flex align-items-center py-3 ${
                        activeMenu === item.id
                          ? "bg-primary bg-opacity-10 border-start border-primary border-4"
                          : ""
                      }`}
                      onClick={() => handleMenuClick(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Icon size={20} className="me-3" />
                      <span
                        className={activeMenu === item.id ? "fw-semibold" : ""}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`col-lg-9 ${loading ? "is-loading-pulse" : ""}`}>
          {/* Profile Card */}
          {activeMenu === "profile" && (
            <>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4 className="mb-1 fw-bold">Mi Perfil</h4>
                      <p className="text-muted mb-0">
                        Toda tu información de cuenta en un solo lugar
                      </p>
                    </div>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                    >
                      {showPasswordChange
                        ? "Ocultar cambiar contraseña"
                        : "Cambiar contraseña"}
                    </button>
                  </div>

                  <form onSubmit={handleProfileUpdate}>
                    <div className="row g-2 g-md-5">
                      <div className="col-md-6">
                        <label className="form-label text-muted small">
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          value={profileData.firstName}
                          onChange={(e) => {
                            setProfileData({
                              ...profileData,
                              firstName: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-muted small">
                          Apellido
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          value={profileData.lastName}
                          onChange={(e) => {
                            setProfileData({
                              ...profileData,
                              lastName: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-muted small">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control bg-light border-0"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary px-4 text-white"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {showPasswordChange && (
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="mb-1 fw-bold">Cambiar Contraseña</h4>
                    <p className="text-muted mb-4">Actualiza tu contraseña</p>

                    <form onSubmit={handlePasswordChange}>
                      <div className="row g-2 g-md-5">
                        <div className="col-md-6">
                          <label className="form-label text-muted small">
                            Contraseña anterior
                          </label>
                          <div className="input-group">
                            <input
                              type={showPasswords.old ? "text" : "password"}
                              className="form-control bg-light border-0"
                              placeholder="********"
                              value={passwordData.oldPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  oldPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              type="button"
                              className="btn bg-light border-0"
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  old: !showPasswords.old,
                                })
                              }
                            >
                              {showPasswords.old ? (
                                <Eye size={20} />
                              ) : (
                                <EyeOff size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-muted small">
                            Contraseña nueva
                          </label>
                          <div className="input-group">
                            <input
                              type={showPasswords.new ? "text" : "password"}
                              className="form-control bg-light border-0"
                              placeholder="********"
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              type="button"
                              className="btn bg-light border-0"
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  new: !showPasswords.new,
                                })
                              }
                            >
                              {showPasswords.new ? (
                                <Eye size={20} />
                              ) : (
                                <EyeOff size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-muted small">
                            Confirmar contraseña
                          </label>
                          <div className="input-group">
                            <input
                              type={showPasswords.confirm ? "text" : "password"}
                              className="form-control bg-light border-0"
                              placeholder="********"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              type="button"
                              className="btn bg-light border-0"
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  confirm: !showPasswords.confirm,
                                })
                              }
                            >
                              {showPasswords.confirm ? (
                                <Eye size={20} />
                              ) : (
                                <EyeOff size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary px-4 text-white"
                        >
                          Guardar Cambios
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
          {activeMenu === "list" && (
            <div>
              <p>Listas</p>
            </div>
          )}
          {activeMenu === "orders" && (
            <div>
              <p>Pedidos</p>
            </div>
          )}
        </div>
      </div>

      {showAvatarModal && (
        <AvatarUpdateModal
          show={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          newAvatarUrl={newAvatarUrl}
          setNewAvatarUrl={setNewAvatarUrl}
          onSave={handleAvatarChange}
          loading={loading}
          currentAvatar={profileData.avatar}
        />
      )}
    </div>
  );
}

export default Profile;
