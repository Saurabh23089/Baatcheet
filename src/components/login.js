import { useLocation, useNavigate } from 'react-router-dom';
import '../firebase.js';
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
        const errormessage = error.message;

        switch (errorcode) {
          case "auth/wrong-password":
            setwrongpassword(true);
            break;
          case "auth/user-not-found":
            alert("User not Found!");
            break;
          case "auth/weak-password":
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
        const user = result.user;

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          alert('User does not exist , Redirecting to Register page');
          setTimeout(() => {
            navigate('/Register');
          }, 2000)
          return;
        } else {
          setloading(true);
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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
          <h4 className='text-4xl font-bold text-blue-600 mb-2'>BaatCheet</h4>
          <h6 className='text-lg text-gray-700 mb-6'>Login</h6>
          <form onSubmit={handlesubmit} className="w-full max-w-sm space-y-4">
            <input
              type="email"
              placeholder='Email'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <input
              type="password"
              placeholder='Password'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <button
              type="submit"
              className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200'
            >
              Sign in
            </button>
          </form>

          <div className='mt-6 w-full max-w-sm'>
            <button
              className="w-full flex items-center justify-center bg-white border border-gray-300 py-2 rounded hover:shadow-md transition duration-200"
              onClick={googlesignin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-5 w-5 mr-2"
              >
                <path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z" />
                <path fill="#34a853" d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z" />
                <path fill="#fbbc02" d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z" />
                <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z" />
              </svg>
              Sign in with Google
            </button>
          </div>

          {wrongpassword && (
            <p className='text-red-600 mt-4 text-sm'>Incorrect Password!</p>
          )}
          <div className='inline-flex items-center justify-center'>
            <p className=' text-gray-700'>You don't have an account?</p>
            <p
              className='text-blue-600 cursor-pointer hover:underline'
              onClick={() => navigate('/register')}
            >
              Register
            </p>
          </div>

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
      )}
    </div>
  );
}

export default Login;