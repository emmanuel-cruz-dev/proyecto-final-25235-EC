import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));

function AppRouter() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
