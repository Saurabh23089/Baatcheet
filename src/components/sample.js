import { query,doc, getDocs,getDoc, getFirestore,collection,where } from "firebase/firestore";
import React,{ useContext, useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import '../chatpage.css';
import '../firebase.js';
// import {authcontext} from "../authcontext.js";
import {db} from '../firebase.js';
import Leftportion from './leftportion.js';
import Rightpart from './chat.js';
import Chats from './chats.js';
// import {getAuth,currentUser} from 'firebase/auth';

const Sample=() => {
    
   return (
       <>
      <div className="chat">
        <div className="container">
         <Leftportion/>
         {/* <Chats/> */}
         <Rightpart/>
        </div>
      </div> 
       </>
   )
}

export default Sample;