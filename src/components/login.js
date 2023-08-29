import {useLocation, useNavigate} from 'react-router-dom'; 
/* The useLocation hook is used to access the current location object,
 which contains information about the current URL and navigation state.*/
 import '../login.css'
 //import Createaccount from './createaccount.js';
 

const Login=()=>{
    const navigate=useNavigate();
   return(
       <div className="logincontainer">
        <h4 className='title'>BaatCheet</h4>
        <h6 className='smalltitle'>Login</h6>
        <form>
            <input type="email" placeholder='email' className='ip4'/>
            <input type="password" placeholder='password' className='ip5'/>
        </form>
        <button className='signinbtn'>Sign in</button>
        <p className='asksignup'>You don't have an account?</p>
        <p className='register' onClick={() => navigate('/register')}>Register</p>
       </div>
   )
}

export default Login;