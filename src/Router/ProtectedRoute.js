import React from 'react'
import {Navigate } from "react-router-dom";
import { isAuthenticated } from '../Auth';

export default function ProtectedRoute({ children }) {

  const checkAuth = isAuthenticated();

  console.log('check auth is : ' , checkAuth);

  const auth = localStorage.getItem('currentUser') === 'null' ? false : true;
  return auth === true ? children : <Navigate to="/" />;
}
