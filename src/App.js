import logo from './logo.svg';
import './App.css';
import Homepage from './components/homepage.js'
import React from 'react';
import Login from './components/loginpage.js';
import './firebase.js';
import {Router,BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/Homepage' element={<Homepage/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
