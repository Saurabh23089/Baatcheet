import {React,useEffect,useState} from 'react';
import Popup from 'reactjs-popup';

// const Maincomponent = () => {
//     const openPasswordResetPopup = () => {
//         PopupboxManager.open({ content: <Resetpassword /> });
//       };

    
//       console.log("1");

// }

const Resetpassword = () => {
    const[email,setemail]=useState("");
    const[otp,setotp]=useState("");

    console.log("1");

    return (
        <Popup  open 
        position="right center"
        closeOnDocumentClick
      >
        <span> Popup content </span>
      </Popup>
    )
       
   

   

   

}

export default Resetpassword;