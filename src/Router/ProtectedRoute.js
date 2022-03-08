import React from 'react'
import {Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {

  const auth = localStorage.getItem('currentUser') === 'null' ? false : true;
  return auth.currentUser !== null ? children : <Navigate to="/" />;
}
