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
    <div className="flex flex-col w-full max-h-screen bg-white border-l">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {data?.user?.displayName || 'Select a user'}
        </h2>
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <Messages />
      </div>

      {/* Input Box */}
      <div className="border-t bg-gray-50 ">
        <Input />
      </div>
    </div>
  );

}

export default Rightpart;