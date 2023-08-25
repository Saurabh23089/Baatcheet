import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Messages from "./messages.js";
import Input from './input.js';


const Rightpart=()=>{
    return (
        <div className='cat'>
           <div className='chatinfo'>
               <span>Saurabh</span>
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