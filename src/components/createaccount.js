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

    const[profilepicture,setprofilepicture]=useState('');
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[uid,setuid]=useState("");

    const navigate=useNavigate();
    const location=useLocation();
    

    const onimagechange=(e) => {
        const image=e.target.files[0];
        const reader=new FileReader();

       reader.onload=(e) => {
          const imageurl=e.target.result;
          console.log(imageurl); 
          setprofilepicture(imageurl);
          console.log(profilepicture);
       }

       reader.readAsDataURL(image);
         /* Here one thing to notice is that imageurl gets updated but when we log
       the profile picture it shows an empty string the reason being reader.readAsDataURL(image); is an
       asynchronous and omload will be triggered when the file reading is complete and the 
       rest of the code after reader.readAsDataURL is executed immediately without waiting for the onload event to fire */
       /* However logging it in onload also gives empty string because the state update might not have happened yet,
       and hence it appears as an empty string. So we need to use the useeffect hook */ 

    }

    // useEffect(() => {   /* We have passed here the profile picture as a dependency to ensure that
    //     useEffect will be triggered whenever profilepicture changes, and you can log the value there to ensure that it's correctly being set */
    //     console.log(profilepicture);  // Here it is logged correctly

    // },[profilepicture])

    console.log(profilepicture);

    const auth=getAuth();
    const signup=async(email,password,profilepicture,name)=>{
        console.log('Sign up is called');
        
        const firestore=getFirestore();
        try{
              const usercredential=await createUserWithEmailAndPassword(auth,email,password);
              const user=usercredential.user;
              const userid=user.uid;
              console.log(user.uid);
              setuid((previd)=> userid);
              console.log(uid);
              if(user)
              {
                  const userdata={
                      uid:user.uid,
                      name:name,
                      email:user.email,
                      profilepictureurl:profilepicture
                  }

                  const collectionref=collection(firestore,'users');
                  await addDoc(collectionref,userdata);
                  console.log(`SignUp Successfull:${user.uid}`);
                  console.log(profilepicture); /* The issue I am having is when I logit herer it shows correct url but when i pass it to sample.js it show undefined */
                //   navigate('/Sample',{state:{
                //       profilepicture:profilepicture
                //   }})

                navigate('/Sample', { state: { profilepicture: profilepicture, userid: user.uid } });
                 
              }
        } 


        catch(error){
            console.log(error.message);
        }
    }

    const register=(e)=>{
        e.preventDefault();
        signup(email,password,profilepicture,name);
    }


   
  /* const signup=(auth,email,password,profilepicture) => 
   {
        const auth=getAuth();
        const firestore=getFirestore();
       createUserWithEmailAndPassword(auth,email,password,profilepicture)
       .then((usercredential) => {
           const user=usercredential.user;
          
               const userdata={
                   uid:"",
                   email:"",
                   profilepicture:""
               }

               if(uid&&userdata)
               {
                   userdata.uid=user.uid;
                   userdata.email=user.email;
                   userdata.profilepicture=profilepicture;
               }



           const collectionref=collection(firestore,'users');
           await addDoc(collectionref,userdata);
       })
       .catch((error) => {
           console.log(error.message);
       })
   }*/

   const handlesubmit=async(e)=>{
      e.preventDefault();
      const Name=e.target[0].value;
      const eemail=e.target[1].value;
      const passsword=e.target[2].value;
      const file=e.target[3].files[0];

      

      console.log(Name,eemail,passsword,file);
      try {
        const res=await createUserWithEmailAndPassword(auth,eemail,passsword)
        console.log(res);
        const storage=getStorage();

        const storageref=ref(storage,Name);
        const uploadTask = uploadBytesResumable(storageref, file);
        // .then((usercredential) => {
        //     const user=usercredential.user;
        //     console.log(user);
        // })

        uploadTask.on(

            (error) => {
                console.log(error.message);
            },

            () => {
               getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                     await updateProfile(res.user,{
                         Name,
                         photoURL:downloadURL,
                     })

                    //  console.log(Name);
                    //  console.log(eemail);
                    //  console.log(res.user.uid);
                    //  console.log(downloadURL);

                    //  const userr=auth.currentUser;
                    //  console.log("Cuuurent User",userr);
                    //  console.log(db);

                     await setDoc(doc(db,"users",res.user.uid),{
                        uid:res.user.uid,
                        Name,
                        eemail,
                        photoURl:downloadURL
                    })

                    console.log(Name);
                     console.log(eemail);
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
      }
      
   }
    
    return(
        <div className='formcontainer'>
         <h4 className='title'>BaatCheet</h4>
         <h6 className='smalltitle'>Register</h6>
         <form onSubmit={handlesubmit}>
            <input type="text" placeholder="Your Name" className='ip1' onChange={(e) => setname(e.target.value)}/>
            <input type="email" placeholder='Email' className='ip2' onChange={(e) => setemail(e.target.value)}/>
            <input type="password" placeholder="Password" className='ip3' onChange={(e) => setpassword(e.target.value)}/>
            <label className='l1'>
         <img src={image} alt="uploadicon" className='im1'/>
         <p className='av'>Add an avatar</p>
         <input type="file" accept='/image*' className='imageinput' onChange={onimagechange}></input>
         </label>
         <button className='signupbtn' >Sign up</button>
         </form>
         
        
        
         <p className='acexists'>You do have an account?</p>
         <p className='login' onClick={() => {navigate('/Login')}}>Login</p>
        </div>

    )
}

export default Createaccount;

/* <img src={image} alt="uploadicon" className='im1'/>
         <p className='av'>Add an avatar</p>
         <input type="file" accept='/image*'  style={{display:'none'}}/>
         
        */
















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

