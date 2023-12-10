import React from "react";
import '../chatpage.css';
import '../firebase.js';
import Leftportion from './leftportion.js';
import Rightpart from './chat.js';


const Sample=() => {
    
   return (
       <>
      <div className="chat">
        <div className="container">
         <Leftportion/>
         <Rightpart/>
        </div>
      </div> 
       </>
   )
}

export default Sample;