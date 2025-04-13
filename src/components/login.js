import { useLocation, useNavigate } from 'react-router-dom';
import '../firebase.js';
import '../login.css'
import { auth } from '../firebase';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { Discuss } from 'react-loader-spinner';

const Login = () => {

  const [wrongpassword, setwrongpassword] = useState(false);
  const [loading, setloading] = useState(false);

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
        setloading(true);
        navigate('/home');
        setloading(false);
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
            // console.log("1");
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

        else {
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

    <div>
      {!loading ? (
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                style={{ marginRight: '10px' }}
                height="24"
                width="24"
              >
                <path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z" />
                <path fill="#34a853" d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z" />
                <path fill="#fbbc02" d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z" />
                <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z" />
              </svg>

              Sign in with Google
            </button>
          </div>
          {wrongpassword && <p className='ps'>Incorrect Paasword!</p>}
          <p className='asksignup'>You don't have an account?</p>
          <p className='register' onClick={() => navigate('/register')}>Register</p>

        </div>
      ) : (
        <Discuss
          visible={true}

          height="50%"
          width="50%"
          ariaLabel="discuss-loading"
          wrapperStyle={{
            position: 'absolute',
            top: '25%',
            left: '25%',
          }}
          wrapperClass="discuss-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      )
      }
    </div>




  )
}

export default Login;