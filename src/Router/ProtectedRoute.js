import React from 'react'
import { useDispatch } from 'react-redux';
import {Navigate } from "react-router-dom";
import { setCurrentUser } from '../store/Slices/CurrentUserSlice';


export default function ProtectedRoute({ children }) {

  let dispatch = useDispatch();
  const auth = localStorage.getItem('currentUser') === 'null' ? false : true;

  if(localStorage.getItem('currentUser') !== 'null'){
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('currentUser'))));
  }

  return auth === true ? children : <Navigate to="/" />;
}
