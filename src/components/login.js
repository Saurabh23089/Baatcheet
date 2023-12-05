import {useLocation, useNavigate} from 'react-router-dom'; 
import '../firebase.js';
/* The useLocation hook is used to access the current location object,
 which contains information about the current URL and navigation state.*/
 import '../login.css'
import { auth } from '../firebase';
import { useState } from 'react';
import PopupboxManager from 'reactjs-popup';
import { doc, setDoc, addDoc, collection, collectionref, getFirestore } from 'firebase/firestore';
import { db } from '../firebase.js';
import {getAuth,signInWithPopup, GoogleAuthProvider, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
        <div className='popup'>
              {showResetPassword && (
               
            <Popup 
            open={showResetPassword}
            position="top left"
            closeOnDocumentClick
            onClose={() => {setshowResetPassword(false)}}
            contentStyle={{ position:"relative", top: "-75px", left: "-10px" }} // Set top and left positions
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
    const provider = new GoogleAuthProvider();

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

    const googlesignin = () => {
      signInWithPopup(auth, provider)
        .then( (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // const displayName = user.displayName;
          // const email = user.email;
  
          // const photourl = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
  
          // await setDoc(doc(db, "users", user.uid), {
          //   uid: user.uid,
          //   displayName: displayName,
          //   email: email,
          //   photoURl: photourl,
          // });
  
          // await setDoc(doc(db, "userchats", user.uid), {});
          navigate('/Sample');
  
        })
        .catch((error) => {
          console.log(error.message);
          console.log(error.code);
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
        <div className='googlesignin'>
            <button className="sinupbtn" onClick={googlesignin} >
            <img className="logo" src="https://banner2.cleanpng.com/20180521/ers/kisspng-google-logo-5b02bbe1d5c6e0.2384399715269058258756.jpg" alt="googlelogo" />
            Sign in with Google
          </button>
            </div>  
        {wrongpassword&&<p className='ps'>Incorrect Paasword!</p>}
        {/* <p className='ps ps1' onClick={() => {setshowResetPassword(true)}}>Forgot Password</p> */}
        {showResetPassword && <Resetpassword showResetPassword={showResetPassword} setshowResetPassword={setshowResetPassword} />}
        <p className='asksignup'>You don't have an account?</p>
        <p className='register' onClick={() => navigate('/register')}>Register</p>
       </div>
   )
}

export default Login;