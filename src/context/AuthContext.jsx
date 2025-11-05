import { createContext, useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") === null ? false : true;
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const newUser = await response.json();
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsAuthenticated(true);
    return newUser;
  };

  const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    const users = await response.json();

    const foundUser = users.find((u) => u.password === password);

    if (foundUser) {
      setIsAuthenticated(true);
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return foundUser;
    }
    throw new Error("Credenciales incorrectas");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
