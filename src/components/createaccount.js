import { provider } from '../firebase.js';
import Login from './login.js';
import {getAuth,signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {useLocation, useNavigate } from 'react-router-dom';
import '../createaccount.css';
import image from './image.png';
import React, { Profiler, useEffect, useState } from 'react';
import { doc,setDoc,addDoc,collection,collectionref, getFirestore } from 'firebase/firestore';
import Sample from './sample.js';
import {db} from '../firebase.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';

const Createaccount=() => {


    const navigate=useNavigate();

    const auth=getAuth();

   const handlesubmit=async(e)=>{
      e.preventDefault();
      const displayName=e.target[0].value;
      const email=e.target[1].value;
      const passsword=e.target[2].value;
      const file=e.target[3].files[0];

      

      console.log(displayName,email,passsword,file);
      try {
        const res=await createUserWithEmailAndPassword(auth,email,passsword)
        console.log(res);
        const storage=getStorage();

        const storageref=ref(storage,displayName);
        const uploadTask = uploadBytesResumable(storageref, file);

        uploadTask.on(

            (error) => {
                console.log(error.message);
            },

            () => {
               getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                     await updateProfile(res.user,{
                         displayName,
                         photoURL:downloadURL,
                     })


                     await setDoc(doc(db,"users",res.user.uid),{
                        uid:res.user.uid,
                        displayName,
                        email,
                        photoURl:downloadURL
                    })

                    await setDoc(doc(db,"userchats",res.user.uid),{

                    })

                    console.log(displayName);
                     console.log(email);
                     console.log(res.user.uid);
                    if(downloadURL)
                    {
                        console.log(downloadURL);
                    }

                     const userr=auth.currentUser;
                     console.log("Cuuurent User",userr);
                     console.log(db);
                     console.log(userr);

                     navigate('/Sample');
                })


                
            }
        )
          
      }
      catch (error) {
          console.log(error.message);
          const errorcode=error.code;
          const errormessage=error.message;
          switch(errorcode){
            case "auth/email-already-in-use":
                alert("User already Registered");
                break;
            case "auth/weak-password":
              console.log("1");
                alert("Password should be at least 6 characters");
                break;
            default:
                console.log(error.message);
        }
      }
      
   }
    
    return(
        <div className='formcontainer'>
         <h4 className='title'>BaatCheet</h4>
         <h6 className='smalltitle'>Register</h6>
         <form onSubmit={handlesubmit}>
            <input type="text" placeholder="Your Name" className='ip1'/>
            <input type="email" placeholder='Email' className='ip2'/>
            <input type="password" placeholder="Password" className='ip3'/>
            <label className='l1'>
         <img src={image} alt="uploadicon" className='im1'/>
         <p className='av'>Add an avatar</p>
         <input type="file" accept='/image*' className='imageinput'></input>
         </label>
         <button className='signupbtn' >Sign up</button>
         </form>
         
        
        
         <p className='acexists'>You do have an account?</p>
         <p className='login' onClick={() => {navigate('/Login')}}>Login</p>
        </div>

    )
    }



export default Createaccount;

















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


