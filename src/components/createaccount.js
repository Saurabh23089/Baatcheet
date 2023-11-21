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
        // const uploadTask = uploadBytesResumable(storageref, file);

        const uploadTask = uploadBytesResumable(storageref, file);

uploadTask.on(
  "state_changed",
  (snapshot) => {
    // This function is called during the upload process
    // You can handle progress or other snapshot events here
  },
  (error) => {
    console.log(error.message);
  },
  async () => {
    // This function is called when the upload is complete
    try {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURl: downloadURL,
      });

      await setDoc(doc(db, "userchats", res.user.uid), {});

      // ... rest of your code

      console.log(downloadURL);
      const userr = auth.currentUser;
      console.log("Current User", userr);
      console.log(db);
      console.log(userr);

      navigate('/Sample');
    } catch (error) {
      console.log(error);
    }
  }
);


        // uploadTask.on(

        //     (error) => {
        //         console.log(error.message);
        //     },

        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {

        //             try{
        //                 await updateProfile(res.user,{
        //                     displayName,
        //                     photoURL:downloadURL,
        //                 })

        //                 await setDoc(doc(db,"users",res.user.uid),{
        //                     uid:res.user.uid,
        //                     displayName,
        //                     email,
        //                     photoURl:downloadURL
        //                 })

        //                 await setDoc(doc(db,"userchats",res.user.uid),{
 
        //                 })
    
        //                 console.log(displayName);
        //                  console.log(email);
        //                  console.log(res.user.uid);
        //                 if(downloadURL)
        //                 {
        //                     console.log(downloadURL);
        //                 }
    
        //                  const userr=auth.currentUser;
        //                  console.log("Cuuurent User",userr);
        //                  console.log(db);
        //                  console.log(userr);
    
        //                  navigate('/Sample');

        //             }

        //             catch(error){
        //                console.log(error);
        //             }
                    
        //          })
 
 
                 
        //      }

        //     // () => {
        //     //    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        //     //          await updateProfile(res.user,{
        //     //              displayName,
        //     //              photoURL:downloadURL,
        //     //          })


        //     //          await setDoc(doc(db,"users",res.user.uid),{
        //     //             uid:res.user.uid,
        //     //             displayName,
        //     //             email,
        //     //             photoURl:downloadURL
        //     //         })

        //     //         await setDoc(doc(db,"userchats",res.user.uid),{

        //     //         })

        //     //         console.log(displayName);
        //     //          console.log(email);
        //     //          console.log(res.user.uid);
        //     //         if(downloadURL)
        //     //         {
        //     //             console.log(downloadURL);
        //     //         }

        //     //          const userr=auth.currentUser;
        //     //          console.log("Cuuurent User",userr);
        //     //          console.log(db);
        //     //          console.log(userr);

        //     //          navigate('/Sample');
        //     //     })


                
        //     // }
        // )
          
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



