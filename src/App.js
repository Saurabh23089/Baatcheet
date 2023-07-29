import logo from './logo.svg';
import './App.css';
import Createaccount from './components/createaccount.js'
import React from 'react';
import Login from './components/login.js';
import './firebase.js';
import {Router,BrowserRouter,Routes,Route} from 'react-router-dom';
import Sample from './components/sample.js';

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Createaccount/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/Sample' element={<Sample/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
