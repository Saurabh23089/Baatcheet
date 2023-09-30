import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Messages from "./messages.js";
import Input from './input.js';
import {useContext,useEffect} from 'react';
import {AuthContext} from '../context/authcontext';
import {ChatContext} from '../context/chatcontext';


const Rightpart=()=>{

   const {data}=useContext(ChatContext);
   console.log(data);

    return (
        <div className='cat'>
           <div className='chatinfo'>
               <span>{data.user.displayName}</span>
               <div className='chaticons'>
               <i className="bi bi-camera-video-fill"></i>
               <i className="bi bi-person-plus-fill"></i>
               <i className='bi bi-three-dots'></i>  
               </div>
           </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Rightpart;