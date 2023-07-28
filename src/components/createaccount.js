import { provider } from '../firebase.js';
import Login from './login.js';
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {useNavigate } from 'react-router-dom';
import '../createaccount.css';
import image from './image.png';
import React, { useState } from 'react';

const Createaccount=() => {

    const[profilepicture,setprofilepicture]=useState('');

    const onimagechange=(e) => {
        const image=e.target.files[0];
        const reader=new FileReader();

       reader.onload=(e) => {
          const imageurl=e.target.result;
          console.log(imageurl);
          setprofilepicture(imageurl);  
       }

       reader.readAsDataURL(image);
       console.log(profilepicture);

       
    }


    const navigate=useNavigate();
    return(
        <div className='formcontainer'>
         <h4 className='title'>BaatCheet</h4>
         <h6 className='smalltitle'>Register</h6>
         <form>
            <input type="text" placeholder="Your Name" className='ip1'/>
            <input type="text" placeholder='Email' className='ip2'/>
            <input type="text" placeholder="Password" className='ip3'/>
         </form>
         <label className='l1'>
         <img src={image} alt="uploadicon" className='im1'/>
         <p className='av'>Add an avatar</p>
         <input type="file" accept='/image*' className='imageinput' onChange={onimagechange}></input>
        </label>
        
         <button className='signupbtn'>Sign up</button>
         <p className='acexists'>You do have an account?</p>
         <p className='login' onClick={() => {navigate('/Login')}}>Login</p>
         {profilepicture&&<img className="g" src={profilepicture} alt="pp"/>}
        </div>

    )
}

export default Createaccount;

/* <img src={image} alt="uploadicon" className='im1'/>
         <p className='av'>Add an avatar</p>
         <input type="file" accept='/image*'  style={{display:'none'}}/>  */
















/*

function Login(){
   
    const provider=new GoogleAuthProvider();
    provider.addScope('profile');
    const navigate=useNavigate();

    const signinwithgoogle=() => {
        const auth=getAuth();
        signInWithPopup(auth,provider)
       .then((result) => {
           const user=result.user;
           console.log(user);
           console.log('Sign In Successfull',user); */

            /* The first arguement to the navigate function is the path and the second arguement
              is an options object which is used to pass additional options to navigation.Here 
              he options object has a state property that contains an object with a photoURL property.
            *//*
           navigate('/Homepage',
           {state:{photoURL:user.photoURL}}
           );
          
       })
       
       .catch((error) => {
           const errorcode=error.code;
           const errormessage=error.message;
           console.log('Sign In Failed',errormessage,errorcode);
       })
    }

    const handleonclick=(e)=> {
       e.preventDefault();
       signinwithgoogle();  
    }

    return (
        <>
          <h1 onClick={handleonclick}>Login With Google</h1>
        </>
    )
}

export default Login;*/


