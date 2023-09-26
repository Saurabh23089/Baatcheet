import React, { useContext } from "react";
import { ChatContext } from "../context/chatcontext";
import {AuthContext} from "../context/authcontext";

const Input=()=>{

  const currentuser=useContext(AuthContext);
  const {data} = useContext(ChatContext);
  console.log(currentuser);
  console.log(data);

   const sendmessage = () => {

   }

    return(
        <div className="lastinput">
          <input type="text"/>
          <div className="inputicons">
          <i class="bi bi-paperclip"></i>
          <i class="bi bi-file-image"></i>
          <i class="bs bi-send" onClick={sendmessage}></i>
          </div>
        </div>
    )
}

export default Input;