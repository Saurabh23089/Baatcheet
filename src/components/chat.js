import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Messages from "./messages.js";
import Input from './input.js';
import { useContext, useEffect } from 'react';
import { ChatContext } from '../context/chatcontext';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Rightpart = () => {

  const { data } = useContext(ChatContext);
  const { dispatch } = useContext(ChatContext);

  const navigate = useNavigate();

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("signout successfull");
      dispatch({ type: "reset" });
      navigate('/Login');

    })
      .catch((error) => {
        console.log(error.message);
      })
  }

  return (
    <div className='cat'>
      <div className='chatinfo'>
        <span>{data.user.displayName}</span>
        <span className='bn' onClick={logout}>Logout</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Rightpart;