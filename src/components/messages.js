import React, { useContext, useEffect,useRef,useState,useMemo } from "react";
import { doc,onSnapshot} from "firebase/firestore";
import {db} from '../firebase.js';
import '../chatpage.css';
import { AuthContext } from "../context/authcontext";
import {ChatContext} from "../context/chatcontext";
import Message from './message.js';

const Messages=() => {

    const {currentuser}=useContext(AuthContext);
    const {data}=useContext(ChatContext);
    const chatid=data.chatid;

    const[messages,setmessages]=useState([]);
    

    useEffect(() => {
        const unsub=onSnapshot(doc(db, "chats", chatid), (doc) => {
               
            const data=doc.data();
           
            setmessages(data?.messages || undefined);
            
            
        });

       if(chatid){
           return () => {
               unsub();
           }
       }
    },[chatid])

    // console.log(messages);



    return(
        <div className="messages">
        {messages?.map((message) => {
           return <div key={message.id}>
               <Message message={message}/>
           </div>
        })
        }
          
        </div>
    )
}

export default Messages;


// try{

//     if(file){
//       // res = await createUserWithEmailAndPassword(auth, email, passsword)
//       setres(await createUserWithEmailAndPassword(auth, email, passsword))
//     const storage = getStorage();


//     const storageref = ref(storage, displayName);

//     const uploadTask = uploadBytesResumable(storageref, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {

//       },
//       (error) => {
//         console.log(error.message);
//       },

//       async () => {
//         try {
//           downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           setdownloadURL(getDownloadURL(uploadTask.snapshot.ref));
//           console.log(downloadURL);
//         }

//         catch(error){
//           console.log(error.message);

//         }
//       }
      
//     )

//     }

//     else{
//       setdownloadURL("https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=")
//       //  downloadURL="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

//        console.log(downloadURL);
//       }

//        await updateProfile(res.user, {
//     displayName,
//     photoURL: downloadURL,
//   });

//   await setDoc(doc(db, "users", res.user.uid), {
//     uid: res.user.uid,
//     displayName,
//     email,
//     photoURl: downloadURL,
//   });

//   await setDoc(doc(db, "userchats", res.user.uid), {});

//   addDefaultuser(res?.user);
//   const userr = auth.currentUser;

//   // setloading(false)
//   navigate('/home');


//   }