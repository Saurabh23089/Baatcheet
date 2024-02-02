import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import { Discuss } from 'react-loader-spinner'
import '../createaccount.css';
import image from './image.png';
import React from 'react';
import { doc, setDoc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Createaccount = () => {


  const navigate = useNavigate();
  const[loading,setloading]=useState(false);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googlesignup = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // Checking if a user is already signed up using google
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          // User already exists, show alert and return
          alert('User already exists , Redirecting to login page');
          setTimeout(() => {
            navigate('/login');
          }, 2000)
          return;
        }

        const displayName = user.displayName;
        const email = user.email;

        const photourl = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: displayName,
          email: email,
          photoURl: photourl,
        });

        await setDoc(doc(db, "userchats", user.uid), {});
        addDefaultuser(user);
        navigate('/home');

      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  const addDefaultuser = async (currentuser) => {



    const cid = currentuser.uid > process.env.REACT_APP_DEVELOPER_UID ? currentuser.uid + process.env.REACT_APP_DEVELOPER_UID : process.env.REACT_APP_DEVELOPER_UID + currentuser.uid;
    await setDoc(doc(db, "chats", cid), { messages: [] })


    await updateDoc(doc(db, "userchats", currentuser.uid), {
      [cid + ".userInfo"]: {
        uid: process.env.REACT_APP_DEVELOPER_UID,
        photoURL: process.env.REACT_APP_DEVELOPER_PHOTOURL,
        displayName: process.env.REACT_APP_DEVELOPER_DISPLAYNAME
      },
      [cid + ".dateinfo"]: serverTimestamp()
    });

    await updateDoc(doc(db, "userchats", process.env.REACT_APP_DEVELOPER_UID), {
      [cid + ".userInfo"]: {
        uid: currentuser.uid,
        photoURL: currentuser.photoURL,
        displayName: currentuser.displayName
      },
      [cid + ".dateinfo"]: serverTimestamp()
    })
  }

  console.log(loading);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const passsword = e.target[2].value;
    const file = e.target[3].files[0];


    try {
      const res = await createUserWithEmailAndPassword(auth, email, passsword)
      const storage = getStorage();


      const storageref = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageref, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {

        },
        (error) => {
          console.log(error.message);
        },
        async () => {
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

            addDefaultuser(res?.user);
            const userr = auth.currentUser;

            setloading(false)
            navigate('/home');
          } catch (error) {
            setloading(false);
            console.log(error);
          }
        }
      );
    }
    catch (error) {
      console.log(error.message);
      const errorcode = error.code;
      const errormessage = error.message;
      switch (errorcode) {
        case "auth/email-already-in-use":
          alert("User already Registered");
          break;
        case "auth/weak-password":
          alert("Password should be at least 6 characters");
          break;
        default:
          console.log(error.message);
      }
    }

  }

  return (
    <div className='formcontainer'>
      <h4 className='title'>BaatCheet</h4>
      <h6 className='smalltitle'>Register</h6>
      <form onSubmit={handlesubmit}>
        <input type="text" placeholder="Your Name" className='ip1' />
        <input type="email" placeholder='Email' className='ip2' />
        <input type="password" placeholder="Password" className='ip3' />
        <label className='l1'>
          <img src={image} alt="uploadicon" className='im1' />
          <p className='av'>Add an avatar</p>
          <input type="file" accept='/image*' className='imageinput'></input>
        </label>
        <button className='signupbtn' >Sign up</button>
      </form>


      {loading && (
        <Discuss
          visible={true}
          height="80"
          width="80"
          ariaLabel="discuss-loading"
          wrapperStyle={{}}
          wrapperClass="discuss-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      )}

      <div className="googlesignup">
        <button onClick={googlesignup} className="sinupbtn" >
          <img className="logo" src="https://banner2.cleanpng.com/20180521/ers/kisspng-google-logo-5b02bbe1d5c6e0.2384399715269058258756.jpg" alt="googlelogo" />
          Sign up with Google
        </button>

      </div>

      <p className='acexists'>You do have an account?</p>
      <p className='login' onClick={() => { navigate('/Login') }}>Login</p>
    </div>

  )
}



export default Createaccount;



