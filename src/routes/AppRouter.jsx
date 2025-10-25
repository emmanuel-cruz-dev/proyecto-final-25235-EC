import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));

function AppRouter() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
