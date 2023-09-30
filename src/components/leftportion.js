import { getAuth, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navigate,useNavigate} from 'react-router-dom';
import '../chatpage.css';
import { AuthContext } from '../context/authcontext';
import Login from './login.js';
import {db} from '../firebase.js';
import {doc,collection,query,where,getDoc,getDocs,onSnapshot,addDoc,setDoc,QuerySnapshot,updateDoc,serverTimestamp} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ChatContext } from '../context/chatcontext';

const Leftportion=()=>{

  const[username,setusername]=useState("");
  const[user,setuser]=useState('');
  const[error,seterror]=useState("");
  const[enter,setenter]=useState('');
  const isMounted=useRef(true);
  const[currrentuser,setcurrrentuser]=useState('');
  // const[userclicked,setuserclicked]=useState(false);

  const auth=getAuth();

  // To store the contacts of current user
  const [chats,setchats]=useState([]);
  



  

  const navigate=useNavigate();
   const{currentuser}=useContext(AuthContext);
   const{dispatch}=useContext(ChatContext);
   console.log(currentuser);

  useEffect(() => {
   
    console.log(currentuser.uid);
    console.log(currentuser.displayName);
  })

  
  var data='';

  console.log(username);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in.
  //       setcurrrentuser(user);
  //     } else {
  //       // User is signed out.
  //       setcurrrentuser(null);
  //     }
  //   });
  
  //   // Clean up the listener when the component unmounts.
  //   return () => unsubscribe();
  // }, []);
  
  console.log(currentuser);

  
  

     
  
// }

  // useEffect(async() => {
  //   const usersref=collection(db,"users");
  //   const q=query(usersref,where("displayName","==",username));
  //   console.log(q);

  //   try{
  //       const querysnapshot=await getDocs(q);
  //       console.log(querysnapshot.size);
  //      querysnapshot.forEach((doc) => {
        
  //       console.log(doc.data());
  //         console.log(doc.data().displayName);
  //         console.log(doc.data().photoURL);
  //         console.log(user);
  //      })

       
  //   }
    
  //   catch(error){
      
  //      seterror(true);
      
  //   }
  //   setenter('');
  // },[enter])



  // useEffect(async() => {
  //   const usersref=collection(db,"users");
  //   const q=query(usersref,where("displayName","==",username));
  //   console.log(q);

  //   try{
  //       const querysnapshot=await getDocs(q);
  //       console.log(querysnapshot.size);
  //      querysnapshot.forEach((doc) => {
        
  //       console.log(doc.data());
  //         console.log(doc.data().displayName);
  //         console.log(doc.data().photoURL);
  //         console.log(user);
  //      })

       
  //   }
    
  //   catch(error){
      
  //      seterror(true);
      
  //   }
  //   setenter('');
  // },[setenter])
  

  useEffect(() => {
   
    const fetchData = async () => {
      const usersref = collection(db, 'users');
      const q = query(usersref, where('displayName', '==', username));

      try {
        const querysnapshot = await getDocs(q);

        if (isMounted.current) {
          console.log(querysnapshot.size);
          if(querysnapshot.size===0){
            seterror(true);
          }
          querysnapshot.forEach((doc) => {
            console.log(doc.data());
            data=doc.data();

          //  console.log(doc.data().displayName);
           console.log(doc.data().photoURl);
            setuser((prevuser) => doc.data()); // Update the user state
            console.log(user);
          });
        }

        

      } catch (error) {
        if (isMounted.current) {
          seterror(true);
        }
      }
    };

    if (enter) {
      console.log("check");
      fetchData();
      setenter('');
    }
  }, [enter]);

  useEffect(() => {
    console.log(user);
  },[user])
 
  console.log(user);
  if(user){
    console.log(user.displayName);
    console.log(user.photoURl);
  }

  const selectuser = (data) => {
     console.log(data);
    dispatch({type: "changeuser",payload:data});
  }

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(db, "userchats",currentuser.uid), (doc) => {
  //         console.log(doc.exists());
  //   });

  //   return () => {
  //     unsub();
  //   }
  // },[currentuser])

  // useEffect(() => {
  //   let unsub;
  
  //   const fetchData = async () => {
  //     if (currentuser) {
  //       onSnapshot(doc(db, "userchats", currentuser.uid), (doc) => {
  //         console.log(doc.exists());
  //       });
  //     }
  //   };
  
  //   fetchData();
  
  //   return () => {
  //     if (unsub) {
  //       unsub(); // Unsubscribe only if unsub is defined
  //     }
  //   };
  // }, [currentuser]);

  useEffect(() => {
    let unsub;

    const fetchdata = async() => {
      try {
        console.log("1");
        if(currentuser){
          unsub = onSnapshot(doc(db, "userchats", currentuser.uid), (doc) => {
               
               const data=doc.data();
              
               console.log(Object.entries(data));
                setchats(Object.entries(data));
              // console.log(chats);
           });
           }

           

           if(unsub){
             return () => {
               unsub();
             }

        }
      } catch (error) {
        console.log("1");
          console.log(error.message);
      }
    }

   currentuser.uid&&fetchdata();
  },[currentuser])

  console.log(chats);
  
  
  
 


  // const searchuser=async() => {
  //    const usersref=collection(db,"users");
  //    const q=query(usersref,where("displayName","==",username));
  //    console.log(q);

  //    try{
  //        const querysnapshot=await getDocs(q);
  //        console.log(querysnapshot.size);
  //       querysnapshot.forEach((doc) => {
         
  //        console.log(doc.data());
  //          console.log(doc.data().displayName);
  //          console.log(doc.data().photoURL);
  //          console.log(user);
  //       })

        
  //    }
     
  //    catch(error){
       
  //       seterror(true);
       
  //    }
  // }


  const handleselect = async ()=>{
      // Check if the chat between two people exists or not 
     const cid=currentuser.uid>user.uid ? currentuser.uid+user.uid : user.uid+currentuser.uid;
      try {
        const response=await getDoc(doc(db,"chats",cid));
        console.log(response.exists());
        console.log("1");
        if(!response.exists()){
          await setDoc(doc(db,"chats",cid),{messages:[]})

          await updateDoc(doc(db,"userchats",currentuser.uid),{
            [cid+".userInfo"]:{
              uid:user.uid,
              photoURL:user.photoURl,
              displayName:user.displayName,
            },
            [cid+".dateinfo"]:serverTimestamp()   
          })
          await updateDoc(doc(db,"userchats",user.uid),{
            [cid+".userInfo"]:{
              uid:currentuser.uid,
              photoURL:currentuser.photoURl,
              displayName:currentuser.displayName,
            },
            [cid+".dateinfo"]:serverTimestamp()   
          })
        }
      } catch (error) {
         console.log(error.message);
      }

      setuser(null);
      setusername("");
      
  }

  console.log(currentuser);
 
  


  const searchhelper=(e) => {
    console.log(e.key);
    if(e.key==="Enter"){
      setenter(true);
      console.log(enter);
    }
  } 
  


  const logout=()=>{
    const auth=getAuth();
    signOut(auth).then(() => {
      console.log("signout successfull");
      navigate('/Login');
      
      // dispatch({type: "onlogout",payload:data})
      
    }) 
    .catch((error) => {
      console.log(error.message);
    })
  }

    return (currentuser&&
        <div className='toppart'>
            <span className='apptitle'>BaatCheet</span>  
              <div className='one'>
                  {/* {currentuser.photoURL?<img src={url} alt='pp'/>:<img src={url} alt='pp'/>} */}
                  <span className='name'>{currentuser.displayName}</span>
                  {/* <img src={currentuser.photoURL} alt="profilepicture"/> */}
                  <button className='bn' onClick={logout}>Logout</button>
                  <input type="text" placeholder='Find a user' onKeyDown={searchhelper} value={username} onChange={(e) => {setusername(e.target.value)}} className='searchbar'/>
             {user&&<div onClick={handleselect}>
              <img src={user.photoURl} alt='chat1' className='pf1'/>
                <span className='user1'>{user.displayName}</span>
                <p className='lastchat'>He546llo</p>
               </div>
              }   
              {error&&<div>User not Found!</div>} 
              </div>
              <div className="mychats">
                {/* <div>1</div>
                <div>1</div>
                <div>1</div> */}
                {Object.entries(chats)?.map((chat) => {
                   console.log(chat);
                  console.log(chat[1][1].userInfo.photoURL);
                  console.log(chat[1][1].userInfo.displayName);
                  console.log(chat[1][0]);
                  
                   return (
                    <div className='contacts' key={chat[1][0]} onClick={() => {selectuser(chat[1][1].userInfo)}}>
                    <img src={chat[1][1].userInfo.photoURL} alt="profilephto" className='pf1'/> 
                    <span className='user1'>{chat[1][1].userInfo.displayName}</span>
                    <p className='lastchat'>Hel22lo</p>
                    </div>
                   ) 

                    // <h1>1</h1>
                    // <img src={chat[1][1].userInfo.photoURL} alt="profilephto"/> 
                    // <span>{chat[1][1].userInfo.displayName}</span>
                    // <p>Hello</p>

                   



                   // </div>
                    



                })}
                {/* <img src="https://image.shutterstock.com/image-photo/pastoral-green-field-long-shadows-260nw-275372477.jpg" alt='chat1' className='pf1'/>
                <span className='user1'>Shubham Tiwari</span>
                <p className='lastchat'>Hello</p> */}

                {/* <img src="https://image.shutterstock.com/image-photo/pastoral-green-field-long-shadows-260nw-275372477.jpg" alt='chat1' className='pf1'/>
                <span className='user1'>Shubham Tiwari</span>
                <p className='lastchat'>Hello</p>
                <img src="https://image.shutterstock.com/image-photo/pastoral-green-field-long-shadows-260nw-275372477.jpg" alt='chat1' className='pf1'/>
                <span className='user1'>Shubham Tiwari</span>
                <p className='lastchat'>Hello</p>
                <img src="https://image.shutterstock.com/image-photo/pastoral-green-field-long-shadows-260nw-275372477.jpg" alt='chat1' className='pf1'/>
                <span className='user1'>Shubham Tiwari</span>
                <p className='lastchat'>Hello</p> */}
              </div>
              
            </div>
       
    )
}

export default Leftportion; 