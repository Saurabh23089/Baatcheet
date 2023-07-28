import logo from './logo.svg';
import './App.css';
import Createaccount from './components/createaccount.js'
import React from 'react';
import Login from './components/login.js';
import './firebase.js';
import {Router,BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Createaccount/>}/>
       <Route path='/login' element={<Login/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
