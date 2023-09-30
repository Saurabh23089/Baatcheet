import React, { useContext, useEffect,useRef,useState } from "react";
import { doc, getDoc,onSnapshot} from "firebase/firestore";
import {db} from '../firebase.js';
import '../chatpage.css';
import { AuthContext } from "../context/authcontext";
import {ChatContext} from "../context/chatcontext"

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
            // setmessages(data?.messages || []);
            // console.log(messages);
        });

       if(chatid){
           return () => {
               unsub();
           }
       }
    },[messages,chatid])

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
            <div className="messageinfo">
                <img src={data?.user.photoURL} alt="p1"/>
                <span>Just now</span>
            </div>
            <div className="messagecontent">
            <p>Hello</p>
            {/* <img src="https://images.pexels.com/photos/17901179/pexels-photo-17901179/free-photo-of-toddler-standing-in-a-tub.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="m1"/> */}
            </div>
            
           
           
            
           
            
            
        </div>
    )
}

export default Messages;