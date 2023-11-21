import {useLocation, useNavigate} from 'react-router-dom'; 
import '../firebase.js';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
/* The useLocation hook is used to access the current location object,
 which contains information about the current URL and navigation state.*/
 import '../login.css'
import { auth } from '../firebase';
import { useState } from 'react';
import PopupboxManager from 'reactjs-popup';
// import Resetpassword from './passwordreset.js';
// import Resetpassword from './passwordreset.js';
 //import Createaccount from './createaccount.js';


//  import {React,useEffect,useState} from 'react';
import Popup from 'reactjs-popup';
import {sendPasswordResetEmail,applyActionCode} from 'firebase/auth';
// import {auth} from '../firebase';
// // import firebase from '..firebase.js';
// import '../firebase.js';

// const Maincomponent = () => {
//     const openPasswordResetPopup = () => {
//         PopupboxManager.open({ content: <Resetpassword /> });
//       };

    
//       console.log("1");

// }

const Resetpassword = ({showResetPassword,setshowResetPassword}) => {
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

    console.log("1");

   
   


    return (
        <div className='popup'>
              {showResetPassword && (
               
            <Popup 
            open={showResetPassword}
            position="top left"
            closeOnDocumentClick
            onClose={() => {setshowResetPassword(false)}}
            >
        
        <div className='form'>
          <input type="email" placeholder="Registered Email" onChange={(e) => {setemail(e.target.value)}}/>
          <button onClick={sendotp}>nd OTP</button>
          <p>We have sent an OTP at your registered Email</p>
          
        </div>
        
      </Popup>
        )}

        </div>
   
      
      
    )
       
   

   

   

}

// export default Resetpassword;



const Login=()=>{

    const[email,setemail]=useState();
    const[password,setpassword]=useState();
    const[wrongpassword,setwrongpassword]=useState(false);
    const [showResetPassword,setshowResetPassword] = useState(false); // Add state to control Resetpassword visibility


    const navigate=useNavigate();

    // const openPasswordResetPopup = () => {
       
    //    setShowResetPassword(true);
    // };

   

    const handlesubmit=(e) => {
        e.preventDefault();
       const auth=getAuth();
       var email=e.target[0].value;
       var password=e.target[1].value;
       signInWithEmailAndPassword(auth,email,password)
       .then((usercredential) => {
           const user=usercredential.user;
           console.log(user);
           navigate('/Sample');
           email="";
           password="";
       })
       .catch((error) => {
         const errorcode=error.code;
         const errormessage=error.messsage;

         switch(errorcode){
             case "auth/wrong-password":
                setwrongpassword(true);
                break;
             case "auth/user-not-found":
                 alert("User not Found!");
                 break;
             case "auth/weak-password":
               console.log("1");
                 setwrongpassword(true);
                 break;
             default:
                 console.log(error.message);
         }
       })
    }
    

   return(
       <div className="logincontainer">
        <h4 className='title'>BaatCheet</h4>
        <h6 className='smalltitle'>Login</h6>
        <form onSubmit={handlesubmit}>
            <input type="email" placeholder='email' className='ip4'/>
            <input type="password" placeholder='password' className='ip5'/>
            <button className='signinbtn'>Sign in</button>
        </form>
        {wrongpassword&&<p className='ps'>Incorrect Paasword!</p>}
        <p className='ps ps1' onClick={() => {setshowResetPassword(true)}}>Forgot Password</p>
        {showResetPassword && <Resetpassword showResetPassword={showResetPassword} setshowResetPassword={setshowResetPassword} />}
        <p className='asksignup'>You don't have an account?</p>
        <p className='register' onClick={() => navigate('/register')}>Register</p>
       </div>
   )
}

export default Login;