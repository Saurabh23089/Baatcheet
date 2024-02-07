import { useContext,useRef,useEffect, useState } from "react";
import { ChatContext } from "../context/chatcontext";
import {doc,getDoc} from 'firebase/firestore';
import { db } from '../firebase.js';

const Message = ({message}) => {
    const[senderimage,setsenderimage]=useState("");
    const {data}=useContext(ChatContext);
    // console.log(data);

    const messagedate=message?.date.toDate();
    const messagetime=messagedate.toLocaleTimeString();
    const hours = messagedate?.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";

    const months={
        "0":"Jan",
        "1":"Feb",
        "2":"March",
        "3":"April",
        "4":"May",
        "5":"June",
        "6":"July",
        "7":"August",
        "8":"Sep",
        "9":"Oct",
        "10":"Nov",
        "11":"Dec"
    }

    var time='';

    if(messagedate.toLocaleTimeString().slice(0,2).includes(':')){
        time=messagetime.slice(0,4);
    }

    else{
        time=messagetime.slice(0,5);
    }

    var finaltime='';

    if(messagedate.getMonth()!=new Date().getMonth()||messagedate.getDate()!=new Date().getDate()) {
        finaltime=`${time} ${ampm}`+`, ${messagedate.getDate()} ${months[messagedate.getDate()]} ${messagedate.getFullYear()}`;
    }
    
    else
    {
        finaltime=`${time} ${ampm}`;
    }

    const ref=useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({behaviour:'smooth'});
    },[message])

    useEffect(() => {
        const fetchsenderimage = async() => {
            const userDocRef = doc(db, 'users', message.senderId);
        const userDoc = await getDoc(userDocRef);
        if(userDoc.exists()){
            // console.log(userDoc.data());
            setsenderimage(userDoc.data()?.photoURl);
            
        }
        }

   

        if(message){
            fetchsenderimage();
          
        }
    },[message])

    // console.log(senderimage);






    return (
         
        <div className="messageinfo" ref={ref}>

        <div className="timeandphoto">
         <img src={senderimage} alt="p1" className="senderimage"/>
         {message.text && <p className="textmessage">{message.text}</p>} 
         {message.downloadURL && <img src={message?.downloadURL} alt="message" className="imagemessage"/>} 
         </div>
        <span className="messagetime">{finaltime}</span>
           </div> 
    )
}

export default Message;