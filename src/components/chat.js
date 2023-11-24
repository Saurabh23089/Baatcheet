import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Messages from "./messages.js";
import Input from './input.js';
import {useContext,useEffect} from 'react';
import {AuthContext} from '../context/authcontext';
import {ChatContext} from '../context/chatcontext';
import {getAuth,signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';


const Rightpart=()=>{

   const {data}=useContext(ChatContext);
   console.log(data);

   const navigate=useNavigate();

   const logout=()=>{
    const auth=getAuth();
    signOut(auth).then(() => {
      console.log("signout successfull");
      navigate('/Login');
      
      
      // dispatch({type: "onlogout",payload:data})
      
    }) 
    .catch((error) => {
      console.log(error.message);
    })
  }

    return (
        <div className='cat'>
           <div className='chatinfo'>
               <span>{data.user.displayName}</span>
               
                {/* Coming soon */}
               {/* <div className='chaticons'>
               <i className="bi bi-camera-video-fill"></i>
               <i className="bi bi-person-plus-fill"></i>
               <i className='bi bi-three-dots'></i>  
               </div> */}
            {/* <button className='bn' onClick={logout}>Logout</button> */}
            <span className='bn' onClick={logout}>Logout</span>
           </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Rightpart;