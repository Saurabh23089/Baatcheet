import{createContext, useReducer,useContext} from "react";
import {onAuthStateChanged} from "firebase/auth";
import { useState,useEffect } from "react";
import {auth} from '../firebase'
import { AuthContext } from "./authcontext";



export const ChatContext=createContext();

export const ChatContextprovider=({children})=>{
    const {currentuser}=useContext(AuthContext);
    console.log(currentuser);
    console.log(currentuser.uid);
   const initial_state={
       chatid:"null",
       user:{}
   }
 
     const chatreducer = (state,action) => {
       switch(action.type){
           case "changeuser":
               console.log(currentuser); 
               console.log(action.payload);
           return {
               user:action.payload,
               chatid:currentuser.uid>action.payload.uid ? currentuser.uid+action.payload.uid : action.payload.uid+currentuser.uid
           }

           default:
               return state;
       }
   }

   console.log(currentuser.uid);


 
    const [state,dispatch]=useReducer(chatreducer,initial_state);
   
   
   
   

    return (
        <ChatContext.Provider value={{data : state,dispatch}}>
            {children}
        </ChatContext.Provider>
    )
       
};