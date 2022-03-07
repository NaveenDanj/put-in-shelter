import React from 'react'
import {Outlet , Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = true;
  return auth ? children : <Navigate to="/" />;
}
