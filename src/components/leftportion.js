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
import { onLog } from 'firebase/app';
import { async } from '@firebase/util';

const Leftportion=()=>{

  const[username,setusername]=useState("");
  const[user,setuser]=useState('');
  const[error,seterror]=useState("");
  const[enter,setenter]=useState('');
  var isMounted=useRef(true);
  const[currrentuser,setcurrrentuser]=useState('');
  const[activechat,setactivechat]=useState(null);
  const messages=useContext(ChatContext);
  // const[userclicked,setuserclicked]=useState(false);

  const auth=getAuth();

  // To store the contacts of current user
  const [chats,setchats]=useState([]);
  const[lastchat,setlastchat]=useState([]);
  var q="";
  var dataarray=[];
  



  

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
      console.log(username);
      if(currentuser.displayName!=username)
      {
        q = query(usersref, where('displayName', '==', username));
      }
     
     
      try {
        const querysnapshot = await getDocs(q);
        console.log(isMounted.current);

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
        if (username!=currentuser.displayName&&isMounted.current) {
          seterror(true);
        }
      }
    };

    if (enter) {
      console.log("check");
      fetchData();
      setenter('');
    }

    // return () => {
    //   isMounted.current=true;
    // }

  }, [enter]);

  useEffect(() => {
    console.log(user);
  },[user])
 
  console.log(user);
  if(user){
    console.log(user.displayName);
    console.log(user.photoURl);
    console.log(user.uid);
  }

  const selectuser = (data) => {
     console.log(data);
     setactivechat(data.uid);
     console.log(activechat);
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
        // console.log("1");
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
  const[lastmessage,setlastmessage]=useState("");
  const[lc,setlc]=useState();
  

  useEffect(() => {
    console.log(chats);
     chats&&chats.forEach((chatid) => {
       console.log(chatid[0]);
        const unsub=onSnapshot(doc(db, "chats",chatid[0]), (doc) => {
               
          const data=doc.data();
          console.log(data);
          const chatuid = chatid[0];
         
          if(data){
            dataarray=Object.entries(data);
          }
         
          console.log(dataarray);
          console.log(dataarray[0][1]);
          const usermessage=dataarray[0][1];
          console.log(usermessage);

         

          const lm=usermessage[usermessage.length-1];
          console.log(typeof(lm));
          console.log(lm);
          // console.log(lm.text);
          var lastchat='';
          if(lm&&lm.text){
              lastchat=lm.text;
          }

          else if(lm&&lm.downloadURL){
            lastchat=lm.downloadURL;
          }
          
          console.log(lastchat);
          setlc(lastchat);
          setlastmessage((previousvalue) =>
             ({
               ...previousvalue,
               [chatuid]:lastchat
             }) 
        )

        console.log(lastmessage);

        return () => {
          unsub();
        }
         
      });
      
  })

  
},[chats])

console.log(lastmessage);

// const[check,setcheck]=useState();

// setcheck((previousvalue) => 
//   [{
//     ...previousvalue,
//     chatuid:"123"
//   }]
// )

// const check1 =() => {
//    setcheck();
// }

// check1();





console.log(lastmessage);
const showchat = () => {
    for(let i=0;i<lastmessage.length;i++){
      return lastmessage[i];
    }
}






// lastmessage.forEach(i => console.log(i))


  // useEffect(() => {
  //   const fetchlastchat=async(cid)=>{

  //     try{
  //        const unsub=onSnapshot(doc(db, "chats", cid), (doc) => {
                 
  //         const data=doc.data();
  //         console.log(data,"line no 268");
  //         // setlastchat(data)
  //       }); 

  //       return () => {
  //         unsub();
  //       }
  //     } 
  
  //     catch(error){
  //         console.log(error.message);
  //     }

  //     if(cid){
  //         fetchlastchat();
  //       }
  //   }
  // },[messages])

  // const fetchlastchat=async(cid)=>{

  //   try{
  //      const unsub=onSnapshot(doc(db, "chats", cid), (doc) => {
               
  //       const data=doc.data();
  //       console.log(data,"line no 268");
  //       if(data&&data.length>0){
  //         const lastmessage=data[data.length-1];
  //           setlastchat((prevstate) => ({
  //              ...prevstate,[cid]:lastmessage
  //           })
  //           )
  //       }
  //       console.log(lastchat);
  //     }); 

  //     return () => {
  //       unsub();
  //     }
  //   } 

  //   catch(error){
  //       console.log(error.message);
  //   }
  // }

  const message=useContext(ChatContext);

  useEffect(() => {
   
    const lastchat=async() => {

      try {
        const unsub=onSnapshot(doc(db, "userchats", currentuser.uid), (doc) => {
          console.log(doc.data());     
    })

    return () => {
      unsub();
    }
      }
       catch (error) {
        console.log(error.message);
      }  
    }

   

  if(currentuser.uid){
    lastchat();
  }

})


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

  var activeChatId="";

  console.log(currentuser.photoURL);
  // console.log(currentuser.photoURl);
  const handleselect = async()=>{
      // Check if the chat between two people exists or not 
     const cid=currentuser.uid>user.uid ? currentuser.uid+user.uid : user.uid+currentuser.uid;
    
     console.log(currentuser.photoURL);
     try {
     
        const response=await getDoc(doc(db,"chats",cid));
        console.log(response.exists());
       
        if(!response.exists()){
          console.log(currentuser.uid);
          console.log(user.uid);
          console.log(cid);
          console.log(currentuser.photoURl);
          console.log(user.photoURl); 
          await setDoc(doc(db,"chats",cid),{messages:[]})

          console.log("Updating current user's userchats");
console.log("CID:", cid);
console.log("userInfo:", {
  uid: user.uid,
  photoURL: user.photoURl,
  displayName: user.displayName,
});
console.log("dateinfo:", serverTimestamp());

          await updateDoc(doc(db,"userchats",currentuser.uid),{
            [cid+".userInfo"]:{
              uid:user.uid,
              photoURL:user.photoURl,
              displayName:user.displayName,
            },
            [cid+".dateinfo"]:serverTimestamp()   
          });

          console.log("Updating current user's userchats");
console.log("CID:", cid);
console.log("userInfo:", {
  uid: user.uid,
  photoURL: user.photoURl,
  displayName: user.displayName,
});
console.log("dateinfo:", serverTimestamp());

          await updateDoc(doc(db,"userchats",user.uid),{
            [cid+".userInfo"]:{
              uid:currentuser.uid,
              photoURL:currentuser.photoURL,
              displayName:currentuser.displayName,
            },
            [cid+".dateinfo"]:serverTimestamp()   
          })
          console.log("Solve ho jaa yaar");
        }
      } catch (error) {
         console.log(error.message);
      }

      // setuser(null);
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
      <div className='parent'>

        

        <div className='nav'>
          <span className='apptitle'>BaatCheet</span>
          <div className='cudetails'>
          <span className='name'>{currentuser.displayName}</span>
           {/* <img src={currentuser.photoURL} alt="profilepicture"/> */}
           {/* <button className='bn' onClick={logout}>Logout</button> */}
          </div> 
          
        </div>

        
        {/* <input type="text" placeholder='Find a user' onKeyDown={searchhelper} value={username} onChange={(e) => {setusername(e.target.value)}} className='searchbar'/> */}
        <div className='fnd'>
          <input type="text" placeholder='Find a user' onKeyDown={searchhelper} value={username} onChange={(e) => {setusername(e.target.value)}} className='searchbar'/> 
          {user&&<div onClick={handleselect} className="usersearch">
          <img src={user.photoURl} alt='chat1' className='sm'/>
          <span className='user1'>{user.displayName}</span>
          </div>}
          {error&&<div className="notfound">User not Found!</div>}
        </div>

        <div className='mychats'>
        {Object.entries(chats)?.map((chat,index) => {
           console.log(chat);
           console.log(chat[1]);
           console.log(chat[1][0]);
           console.log(chat[1][0]);
           console.log(chat[1][0]);
           console.log(chat[1][0]);
           console.log(chat[1][1].userInfo.photoURL);
           console.log(chat[1][1].userInfo.displayName);
           console.log(chat[1][0]);

           return (
              <div className={`contacts ${activechat==chat[1][1]?.userInfo?.uid?"activechat":""}`} key={chat[1][0]} onClick={() => {selectuser(chat[1][1].userInfo)}}>
              <img src={chat[1][1].userInfo.photoURL} alt="profilephto" className='pf1'/> 
              <span className='user1'>{chat[1][1].userInfo.displayName}</span>
              {lastmessage && lastmessage[chat[1][0]] && lastmessage[chat[1][0]].includes("https://firebasestorage.googleapis.com")? <i className="bi bi-camera">Photo</i>: <p className='lastchat'>{lastmessage[chat[1][0]]}</p>}
        </div>
           )
        })
      }
      
        </div>
        </div>

        

                  // <div className='fnd'>
                 
                  //      {user&&<div onClick={handleselect} className="usersearch">
                  //       <img src={user.photoURl} alt='chat1' className='sm'/>
                  //         <span className='user1'>{user.displayName}</span>
                  //         <p className='lastchat'>He546llo</p>
                  //       </div>}
                  //         <input type="text" placeholder='Find a user' onKeyDown={searchhelper} value={username} onChange={(e) => {setusername(e.target.value)}} className='searchbar'/>
                  //           </div>
      

     
          

        // <div className='toppart'>
        //     <span className='apptitle'>BaatCheet</span>  
        //       {/* <div className='one'> */}
        //           {/* {currentuser.photoURL?<img src={url} alt='pp'/>:<img src={url} alt='pp'/>} */}
        //           <span className='name'>{currentuser.displayName}</span>
        //           {/* <img src={currentuser.photoURL} alt="profilepicture"/> */}
        //           <button className='bn' onClick={logout}>Logout</button>
                 
        //           <div className='fnd'>
                 
        //      {user&&<div onClick={handleselect} className="usersearch">
        //       <img src={user.photoURl} alt='chat1' className='sm'/>
        //         <span className='user1'>{user.displayName}</span>
        //         <p className='lastchat'>He546llo</p>
        //        </div>}
        //         <input type="text" placeholder='Find a user' onKeyDown={searchhelper} value={username} onChange={(e) => {setusername(e.target.value)}} className='searchbar'/>
        //           </div>
                 
                
        //       {error&&<div>User not Found!</div>} 
        //       {/* </div> */}
        //       <div className="mychats">
        //         {/* <div>1</div>
        //         <div>1</div>
        //         <div>1</div> */}
        //         {Object.entries(chats)?.map((chat,index) => {
        //            console.log(chat);
        //            console.log(chat[1][0]);
        //           console.log(chat[1][1].userInfo.photoURL);
        //           console.log(chat[1][1].userInfo.displayName);
        //           console.log(chat[1][0]);
                  
        //            return (
        //             <div className='contacts' key={chat[1][0]} onClick={() => {selectuser(chat[1][1].userInfo)}}>
        //             <img src={chat[1][1].userInfo.photoURL} alt="profilephto" className='pf1'/> 
        //             <span className='user1'>{chat[1][1].userInfo.displayName}</span>
        //            {lastmessage && lastmessage[index] && lastmessage[index].includes("https://firebasestorage.googleapis.com")? <i className="bi bi-camera">Photo</i>: <p className='lastchat'>{lastmessage[index]}</p>}
                  
                    
        //             {/* {lastmessage[index].includes("https://firebasestorage.googleapis.com")?
        //             <i class="bi bi-camera">Photo</i>:
        //             <p className='lastchat'>{lastmessage[index]}</p>}
        //             {/* {lastmessage&&lastmessage.map((i) => {
        //                  return (
        //                    <p key={chat[1][0]}>{lastmessage[index]}</p>
        //                  )
        //             })} */} 
        //             </div>
        //            ) 

        //             // <h1>1</h1>
        //             // <img src={chat[1][1].userInfo.photoURL} alt="profilephto"/> 
        //             // <span>{chat[1][1].userInfo.displayName}</span>
        //             // <p>Hello</p>

                   



        //            // </div>
                    



        //         })}
        //       </div>
              
        //     </div>
       
    )
}

export default Leftportion; 