import React, { useContext, useEffect,useRef,useState,useMemo } from "react";
import { doc, getDoc,onSnapshot} from "firebase/firestore";
import {db} from '../firebase.js';
import '../chatpage.css';
import { AuthContext } from "../context/authcontext";
import {ChatContext} from "../context/chatcontext";
import Message from './message.js';

const Messages=() => {

    const {currentuser}=useContext(AuthContext);
    console.log(currentuser);
    console.log(currentuser?.photoURL);
    const {data}=useContext(ChatContext);
    console.log(data);
    const chatid=data.chatid;
    console.log(chatid);

    console.log(currentuser);
    console.log(data.user.photoURL);

    const[messages,setmessages]=useState([]);
    const messagesref=useRef(messages);

  

//     useRef(() => {
//         messagesref.current=messages;
//     })

//     useEffect(() => {
//         const unsub = onSnapshot(doc(db, "chats", chatid), (doc) => {
//             const data = doc.data();
//             const newMessages = data?.messages;
      
//             // Check if the newMessages array is different from the current messagesRef
//             if (!arraysEqual(newMessages, messagesref.current)) {
//               setmessages(data?.newMessages||[]);
//             }

//             return (() => {
//                 unsub();
//             })
//     })
// },[messages])
// console.log(messages);

//     function arraysEqual(array1,array2){
//         return JSON.stringify(array1) === JSON.stringify(array2);
//     }

    

    
    // useEffect(() => {
    //      const fetchchat = async() => {
    //         const docRef=doc(db, "chats", chatid);
    //         try {
    //             const doc = await getDoc(docRef);
    //             console.log(doc.data());
    //             setchats(doc.data());
    //             console.log(chats);
                
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     }

    //    if(chatid) {
    //        fetchchat();
    //    }
    // },[chatid,chats])

    useEffect(() => {
        const unsub=onSnapshot(doc(db, "chats", chatid), (doc) => {
               
            const data=doc.data();
            console.log(data);
            setmessages(data?.messages || undefined);
            // console.log(messages);
        });

       if(chatid){
           return () => {
               unsub();
           }
       }
    },[chatid])

    // const unsub=onSnapshot(doc(db, "chats", chatid), (doc) => {
               
    //     const data=doc.data();
    //     console.log(data);
    //     setmessages(data?.messages || undefined);
    //     return messages;
    //     // console.log(messages);
    // });

    // const memoizedmessages = useMemo(() => unsub(),[chatid,messages]);
    // console.log(memoizedmessages);

   

    

    // useEffect(() => {
    //     let unsub;
    //     const fetchmessages = async() => {

    //         try {
    //             if(data?.chatid){
    //                 unsub=onSnapshot(doc(db, "chats", chatid), (doc) => {
                   
    //                     const data=doc.data();
    //                     console.log(data);
    //                     setmessages(doc.data().messages);
    //                     // console.log(messages);
    //                 });
    //             }

    //             if(unsub){
    //                 return () => {
    //                     unsub();
    //                 }
    //             }
            
    //         } catch (error) {
    //            console.log(error.message); 
    //         }
            
    //     }

    //     if(data?.chatid){
    //         fetchmessages();
    //     }
    // },[messages]);

    return(
        <div className="messages">
        {messages?.map((message) => {
           return <div key={message.id}>
               <Message message={message}/>
           </div>
        })||
        <div className="altdiv">1</div>
        }
            {/* <div className="messageinfo">
                <img src={data?.user.photoURL} alt="p1"/>
                <span>Just now</span>
            </div>
            <div className="messagecontent">
            <p>Hello</p>
             <img src="https://images.pexels.com/photos/17901179/pexels-photo-17901179/free-photo-of-toddler-standing-in-a-tub.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="m1"/> 
             </div> 
             */}
           
           
            
           
            
            
        </div>
    )
}

export default Messages;