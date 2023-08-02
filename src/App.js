import logo from './logo.svg';
import './App.css';
import Createaccount from './components/createaccount.js'
import React, { useState } from 'react';
import Login from './components/login.js';
import './firebase.js';
import {Router,BrowserRouter,Routes,Route} from 'react-router-dom';
import Sample from './components/sample.js';
import  authcontext from './authcontext.js';
import {AuthProvider,Provider} from './authcontext.js';

function App() {

  const[uid,setuid]=useState();
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
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Createaccount />} />
          <Route path='/Sample' element={<Sample />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
