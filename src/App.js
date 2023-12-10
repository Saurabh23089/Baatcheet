import './App.css';
import Createaccount from './components/createaccount.js'
import React, { useContext, useState } from 'react';
import Login from './components/login.js';
import './firebase.js';
import { Router, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sample from './components/sample.js';
import { auth } from './firebase'
import { AuthContext } from './context/authcontext';


function App() {

  const { currentuser } = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={!currentuser ? <Navigate to="/home" /> : <Navigate to="/Login" />} />
        <Route path='/home' element={<Sample />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Createaccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
