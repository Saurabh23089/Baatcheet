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