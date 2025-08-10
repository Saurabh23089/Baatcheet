import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Discuss } from 'react-loader-spinner'
import '../createaccount.css';
import image from './image.png';
import React from 'react';
import { doc, setDoc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { Discuss } from 'react-loader-spinner'

const Createaccount = () => {


  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const fileInputRef = useRef(null);

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
        setloading(true);
        navigate('/home');
        setloading(false);

      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file.name);

    }
  };

  const handleProfilePhoto = (e) => {
    e.stopPropagation();
    setProfilePhoto("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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


  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const passsword = e.target[2].value;
    const file = e.target.elements.profilePhoto.files[0];

    setProfilePhoto(file)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, passsword)
      const storage = getStorage();


      const storageref = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageref, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //  console.log(snapshot);
        },
        (error) => {
          console.log(error.message);
        },
        async () => {
          try {

            var downloadURL = "";
            if (uploadTask._uploadUrl === undefined) {
              downloadURL = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
            }

            else {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            }
      
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

            setloading(true);
            navigate('/home');
            setloading(false);
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
          navigate('/login')
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
    <div>
      {
        !loading ? (
          <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-8 bg-gray-100">
            <h4 className="text-4xl font-bold text-gray-800 mb-2">BaatCheet</h4>
            <h6 className="text-lg font-medium text-gray-600 mb-6">Register</h6>
            <form onSubmit={handlesubmit} className="flex flex-col w-full max-w-sm gap-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="flex items-center gap-2 cursor-pointer text-sm" htmlFor='profile-upload'>
                <img src={image} alt="uploadicon" className="w-6 h-6 object-cover" />
                <p className="text-gray-700 text-sm whitespace-nowrap">Add an avatar</p>
                {
                  profilePhoto && (
                    <>
                      <p className='whitespace-nowrap text-sm'>{profilePhoto}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleProfilePhoto(e);
                        }}
                        className='cursor-pointer hover:text-red-500 text-lg'
                      >
                        X
                      </button>
                    </>
                  )
                }
              </label>

              <input
                type="file"
                name="profilePhoto"
                id="profile-upload"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
              >
                Sign up
              </button>
            </form>

            <div className="mt-6 w-full max-w-sm">
              <button
                onClick={googlesignup}
                className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:shadow-md hover:bg-gray-100 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5"
                >
                  <path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z" />
                  <path fill="#34a853" d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z" />
                  <path fill="#fbbc02" d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z" />
                  <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z" />
                </svg>
                Sign up with Google
              </button>
            </div>

            <div className='flex items-center justify-center'>
              <p className="text-gray-600">You do have an account?</p>
              <p
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => { navigate('/Login'); }}
              >
                Login
              </p>
            </div>


          </div>
        ) : (
          <div>
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
          </div>
        )
      }
    </div>
  );




}



export default Createaccount;



