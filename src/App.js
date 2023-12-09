import logo from './logo.svg';
import './App.css';
import Createaccount from './components/createaccount.js'
import React, { useContext, useState } from 'react';
import Login from './components/login.js';
import './firebase.js';
import {Router,BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Sample from './components/sample.js';
import {auth} from './firebase'
import { AuthContext } from './context/authcontext';
import Resetform from './components/resetform.js'
// import  authcontext from './authcontext.js';
// import {AuthProvider,Provider} from './authcontext.js';

function App() {

  const[uid,setuid]=useState();

  const{currentuser}=useContext(AuthContext);
  console.log(currentuser);


  return (
    // <BrowserRouter>
    //  <Routes>
    //    <Route path='/' element={<Createaccount/>}/>
    //    <authcontext.Provider value={{uid,setuid}}>
    //    <Route path='/Sample' element={<Sample/>}/>
    //    </authcontext.Provider>
    //    <Route path='/login' element={<Login/>}/>
       
    //  </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/reset" element={<Resetform/>}/>
          <Route path='/' element={!currentuser?<Navigate to ="/home"/>:<Navigate to="/Login"/>} />
          <Route path='/home' element={<Sample />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Createaccount/>}/>
          <Route path='/reset-password' element={<Resetform/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
