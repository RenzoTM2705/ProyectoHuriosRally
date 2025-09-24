// src/routes/AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ResetPassword } from "../pages/ResetPassword";

/*
 AppRoutes: rutas principales de la app
 - Export default para importarlo como `import AppRoutes from "./routes/AppRoutes"`
*/

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  </Router>
);

export default AppRoutes;
