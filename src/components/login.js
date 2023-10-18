import {useLocation, useNavigate} from 'react-router-dom'; 
import '../firebase.js';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
/* The useLocation hook is used to access the current location object,
 which contains information about the current URL and navigation state.*/
 import '../login.css'
import { auth } from '../firebase';
import { useState } from 'react';
import PopupboxManager from 'reactjs-popup';
import Resetpassword from './passwordreset.js';
// import Resetpassword from './passwordreset.js';
 //import Createaccount from './createaccount.js';


const Login=()=>{

    const[email,setemail]=useState();
    const[password,setpassword]=useState();
    const[wrongpassword,setwrongpassword]=useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false); // Add state to control Resetpassword visibility


    const navigate=useNavigate();

    const openPasswordResetPopup = () => {
        console.log("1");
       setShowResetPassword(true);
    };

   

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
        {wrongpassword&&<p className='ps ps1' onClick={openPasswordResetPopup}>Forgot Password</p>}
        {showResetPassword && <Resetpassword />}
        <p className='asksignup'>You don't have an account?</p>
        <p className='register' onClick={() => navigate('/register')}>Register</p>
       </div>
   )
}

export default Login;