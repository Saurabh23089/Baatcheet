import { query,doc, getDocs,getDoc, getFirestore,collection,where } from "firebase/firestore";
import React,{ useContext, useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import '../chatpage.css';
import '../firebase.js';
// import {authcontext} from "../authcontext.js";
import {db} from '../firebase.js';
import Leftportion from './leftportion.js';
import Rightpart from './chat.js';
import Chats from './chats.js';
// import {getAuth,currentUser} from 'firebase/auth';

const Sample=() => {
  //  var {uid,profilepicture} = useContext(authcontext);
//   const location=useLocation();
//  // const {uid, profilepicture } = location.state || {};
//  const uid=location.state.userid||"";
//  console.log(uid);
//  const profilepicture=location.state.profilepicture||"";
//  console.log(profilepicture);

//   //  const [profilepicture, setProfilePicture] = useState("");

//     // const auth=getAuth();

//     // if(uid)
//     // {
//     //     console.log(uid);
//     // }

    
    

//     const[user,setuser]=useState(null);

//     useEffect(() => {
//       const fetchUserData = async (uid) => {
//         try {
//           const firestore = getFirestore();
//           console.log(uid);
//           // const docRef = doc(db, "users", uid);
//           // console.log(docRef);
//           // const docSnapshot = await getDoc(docRef);
//           // console.log(docSnapshot.exists());

//           // if (docSnapshot.exists()) {
//           //   // If the user document exists, set the user state with the data
//           //   setuser(docSnapshot.data());
//           //   console.log(user);
//           // }

//         const usersCollectionRef = collection(firestore, "users");
//         const q = query(usersCollectionRef, where("uid", "==", uid));
//         const querySnapshot = await getDocs(q);
//         console.log(!querySnapshot.empty);

//         if(!querySnapshot.empty)
//         {
//           const userData = querySnapshot.docs[0].data();
//           console.log(userData);
//           setuser(userData);
//         }
          
          
//            else {
//             // Handle the case where the user document does not exist
//             console.log("User document not found.");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       };
  
//       if (uid) {
//         console.log(uid);
//         fetchUserData(uid);
//       }
//     },[]);

//     console.log(user);

    /* This code was working fine and profile picture was also shown but after reloading the page
    it shows error Failed to load resource: the server responded with a status of 431 () , after searching 
    got to know that it occurs when the request headers sent by the client (browser) to the server are too large, and the server cannot process them. This error is usually
    encountered when the URL or query parameters in the request become too long. When you are passing the profilepicture as a query parameter in the URL, it becomes a part of the request headers.
    If the URL becomes too long, it can trigger the 431 error. So now We willtry to get the profile picture url
    using the firestore database  */
//   const location = useLocation();                                  
//   console.log(location);
//   const params = new URLSearchParams(location.search);
//   const profilepicture = params.get("profilepicture");

     
   // const profilepicture="";

    //  const fetchprofilepicture=async(userid) => {
    //     try{
    //         const firestore=getFirestore();
    //         console.log(firestore);
    //         const docref=doc(firestore,"users",userid);
    //         console.log(docref);
    //         const usersnapshot=await getDoc(docref);
    //         console.log(usersnapshot);

    //         if(usersnapshot.exists)
    //         {
    //             const userdata=usersnapshot.data();
    //             profilepicture=userdata.profilepictureurl;
    //         }
    //         else{
    //             profilepicture="https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg";

    //         }    
    //     }
    //     catch(error){
    //         console.log(error.message);
    //     }
    //  }

    //  const userid=uid;
    //  fetchprofilepicture(uid);

    // useEffect(() => {
    //     const fetchProfilePicture = async (userid) => {
    //       try {
    //         const firestore = getFirestore();
    //         const docref = doc(firestore, "users", userid);
    //         const usersnapshot = await getDoc(docref);
    
    //         if (usersnapshot.exists()) {
    //           const userdata = usersnapshot.data();
    //           setProfilePicture(userdata.profilepictureurl);
    //         } else {
    //           setProfilePicture(
    //             "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg"
    //           );
    //         }
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    //     };
    
    //     if (uid) {
    //       fetchProfilePicture(uid);
    //     }
    //   }, [uid]);

    // useEffect(() => {
    //     const fetchProfilePicture = async (userid) => {
    //       try {
    //         const firestore = getFirestore();
    //         const docref = doc(firestore, "users", userid);
    //         const usersnapshot = await getDoc(docref);
    
    //         if (usersnapshot.exists()) {
    //           const userdata = usersnapshot.data();
    //           setProfilePicture(userdata.profilepictureurl); // Use setProfilePicture to update the state
    //         } else {
    //           setProfilePicture(
    //             "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg"
    //           );
    //         }
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    //     };
    
    //     if (uid) {
    //       fetchProfilePicture(uid);
    //     }
    //   }, [uid]);
    


    // console.log(profilepicture);
    // console.log(user);
    
   return (
       <>
       {/* { <div className="navbar">
       <div>
           <h6 className="title1">BaatCheet</h6>
       </div>
       {profilepicture&&<img src={profilepicture} alt="pp" className="pp1"/>}
       { <h6 className="username">Harshit</h6> }
       { {user&&user.map(() => {
         return <h6 className="username">{user.Name}</h6>
       })} }
       { {user&&(<h6 className="username">{user?.name}</h6>)}
      
       <hr className="line1"/>
       <button className="logoutbtn">Logout</button>
       </div> }} */}
      <div className="chat">
        <div className="container">
         <Leftportion/>
         {/* <Chats/> */}
         <Rightpart/>
        </div>
      </div>
      
       </>
   )
}

export default Sample;