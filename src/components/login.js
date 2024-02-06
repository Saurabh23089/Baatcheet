import { useLocation, useNavigate } from 'react-router-dom';
import '../firebase.js';
import '../login.css'
import { auth } from '../firebase';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import {doc,getDoc} from 'firebase/firestore';
import { db } from '../firebase.js';
import { Discuss } from 'react-loader-spinner';

const Login = () => {

  const [wrongpassword, setwrongpassword] = useState(false);
  const[loading,setloading]=useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handlesubmit = (e) => {
    e.preventDefault();
    
    const auth = getAuth();
    var email = e.target[0].value;
    var password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
      .then((usercredential) => {
        const user = usercredential.user;
        navigate('/home');
        email = "";
        password = "";
      })
      .catch((error) => {
        const errorcode = error.code;
        const errormessage = error.messsage;

        switch (errorcode) {
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
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      // Checking if a user is already signed up using google
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // User already exists, show alert and return
        alert('User does not exist , Redirecting to Register page');
        setTimeout(() => {
          navigate('/Register');
        }, 2000)
        return;
      }

      else{
        setloading(true);
        console.log("1")
        navigate('/home');
        setloading(false);
      }


    })
    .catch((error) => {
      console.log(error.message);
    })

   
  }


  return (
    <div className="logincontainer">
      <h4 className='title'>BaatCheet</h4>
      <h6 className='smalltitle'>Login</h6>
      <form onSubmit={handlesubmit}>
        <input type="email" placeholder='email' className='ip4' />
        <input type="password" placeholder='password' className='ip5' />
        <button className='signinbtn'>Sign in</button>

      </form>
      <div className='googlesignin'>
        <button className="sinupbtn" onClick={googlesignin} >
          <img className="logo" src="https://banner2.cleanpng.com/20180521/ers/kisspng-google-logo-5b02bbe1d5c6e0.2384399715269058258756.jpg" alt="googlelogo" />
          Sign in with Google
        </button>
      </div>
      {wrongpassword && <p className='ps'>Incorrect Paasword!</p>}
      <p className='asksignup'>You don't have an account?</p>
      <p className='register' onClick={() => navigate('/register')}>Register</p>




    </div>
  )
}

export default Login;