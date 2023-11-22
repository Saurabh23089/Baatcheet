import {React,useEffect,useState} from 'react';
import Popup from 'reactjs-popup';
import {getAuth,sendPasswordResetEmail,applyActionCode} from 'firebase/auth';
import {auth} from '../firebase';
// import firebase from '..firebase.js';
import '../firebase.js';

// const Maincomponent = () => {
//     const openPasswordResetPopup = () => {
//         PopupboxManager.open({ content: <Resetpassword /> });
//       };

    
//       console.log("1");

// }

const Resetpassword = () => {
    const[email,setemail]=useState("");
    const[otp,setotp]=useState("");
    const [popupopen,setpopupopen]=useState(false);
    const auth=getAuth();

    const sendotp = () => {
         
    sendPasswordResetEmail(auth,email)
      .then(() => {
        console.log("Email Sent Successfully");
        
        // Token Verification
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        const oobCode = urlParams.get('oobCode');
        console.log(oobCode);
        console.log("1");
        applyActionCode(auth, oobCode)
  .then((info) => {
    // The OOB code is valid, and you can proceed with password reset.
    console.log("Valid oobCode");
  })
  .catch((error) => {
    // Handle invalid or expired OOB code.
    console.log(error);
  });
      })
      .catch((error) =>  {
        // Error occurred. Inspect error.code.
        console.log(error);
      });

    }

    

   
   


    return (
        <Popup  open 
        position="top left"
        closeOnDocumentClick
      >
        <div className='form'>
          <input type="email" placeholder="Registered Email" onChange={(e) => {setemail(e.target.value)}}/>
          <button onClick={sendotp}>nd OTP</button>
          <p>We have sent an OTP at your registered Email</p>
          
        </div>
        
      </Popup>
    )
       
   

   

   

}

export default Resetpassword;