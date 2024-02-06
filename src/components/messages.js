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

    console.log(messages);



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