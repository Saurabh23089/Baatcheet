import { doc, getDoc, getFirestore } from "firebase/firestore";
import React,{ useContext, useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import '../chatpage.css';
import '../firebase.js';
import {authcontext} from "../authcontext.js";

const Sample=() => {
  //  var {uid,profilepicture} = useContext(authcontext);
  const location=useLocation();
 // const {uid, profilepicture } = location.state || {};
 const uid=location.state.userid||"";
 const profilepicture=location.state.profilepicture||"";

  //  const [profilepicture, setProfilePicture] = useState("");

    

    // if(uid)
    // {
    //     console.log(uid);
    // }

    console.log(uid);
    console.log(profilepicture);

    const[user,setUser]=useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const firestore = getFirestore();
          const docRef = doc(firestore, "users", uid);
          const docSnapshot = await getDoc(docRef);
          
          if (docSnapshot.exists()) {
            // If the user document exists, set the user state with the data
            setUser(docSnapshot.data());
          } else {
            // Handle the case where the user document does not exist
            console.log("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      if (uid) {
        fetchUserData();
      }
    },[]);
  


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
    


    console.log(profilepicture);
    
   return (
       <>
       <div className="navbar">
       <div>
           <h6 className="title1">BaatCheet</h6>
       </div>
       {profilepicture&&<img src={profilepicture} alt="pp" className="pp1"/>}
       <h6 className="username">Harshit</h6>
       <hr className="line1"/>
       <button className="logoutbtn">Logout</button>
       </div>
      
       </>
   )
}

export default Sample;