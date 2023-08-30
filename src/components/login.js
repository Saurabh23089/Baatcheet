import {useLocation, useNavigate} from 'react-router-dom'; 
import '../firebase.js';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
/* The useLocation hook is used to access the current location object,
 which contains information about the current URL and navigation state.*/
 import '../login.css'
import { auth } from '../firebase';
 //import Createaccount from './createaccount.js';


const Login=()=>{

    const navigate=useNavigate();

    const handlesubmit=(e) => {
        e.preventDefault();
       const auth=getAuth();
       const email=e.target[0].value;
       const password=e.target[1].value;
       signInWithEmailAndPassword(auth,email,password)
       .then((usercredential) => {
           const user=usercredential.user;
           console.log(user);
           navigate('/Sample');
       })
       .catch((error) => {
           console.log(error.message);
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
        
        <p className='asksignup'>You don't have an account?</p>
        <p className='register' onClick={() => navigate('/register')}>Register</p>
       </div>
   )
}

export default Login;