import React, { useContext } from "react";
import '../chatpage.css';
import { AuthContext } from "../context/authcontext";

const Messages=() => {

    const {currentuser}=useContext(AuthContext);
    console.log(currentuser);
    console.log(currentuser.photoURL);

    return(
        <div className="messages">
           
            
            <div className="messageinfo">
                <img src={currentuser.photoURL} alt="p1"/>
                <span>Just now</span>
            </div>
            <div className="messagecontent">
            <p>Hello</p>
            {/* <img src="https://images.pexels.com/photos/17901179/pexels-photo-17901179/free-photo-of-toddler-standing-in-a-tub.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="m1"/> */}
            </div>
            
           
           
            
           
            
            
        </div>
    )
}

export default Messages;