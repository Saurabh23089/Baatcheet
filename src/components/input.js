import React, { useContext, useState } from "react";
import { doc,updateDoc,arrayUnion,Timestamp} from "firebase/firestore";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { ChatContext } from "../context/chatcontext";
import {AuthContext} from "../context/authcontext";
import {db} from "../firebase.js";
import {v4 as uuid} from 'uuid';

const Input=()=>{

  const currentuser=useContext(AuthContext);
  const {data} = useContext(ChatContext);
  console.log(currentuser);
  console.log(data);

  const[text,settext]=useState('');
  const[img,setimg]=useState('');

   const sendmessage = async() => {
      if(img){
        const storage=getStorage();
        const storageref=ref(storage,uuid())
        const uploadtask=uploadBytesResumable(storageref, img);
        uploadtask.on(
          (error) => {
            console.log(error.message);
          },

          () => {
            getDownloadURL(uploadtask.snapshot.ref)
            .then(async(downloadURL) => {
              console.log(downloadURL)
              console.log(img);
              await updateDoc(doc(db,"chats",data.chatid),{
                messages:arrayUnion({
                  id:uuid(),
                  downloadURL,
                  senderId:currentuser.currentuser.uid,
                  date:Timestamp.now()
                })
             })
            })
            .catch((error) => {
              console.log(error);
            })
          }
        )
      }
      else{
        console.log(text);
         await updateDoc(doc(db,"chats",data.chatid),{
            messages:arrayUnion({
              id:uuid(),
              text,
              senderId:currentuser.currentuser.uid,
              date:Timestamp.now()
            })
         })
         settext("");
      }
   }

    return(
        <div className="lastinput">
          <input type="text" value={text} onChange={(e) => {settext(e.target.value)}}/>
          <div className="inputicons">
          <i class="bi bi-paperclip"></i>
          <label>
          <i class="bi bi-file-image" ></i>
          <input type="file" accept="/image*" onChange={(e) => {setimg(e.target.files[0])}}></input>
          </label>
          
          <i class="bs bi-send" onClick={sendmessage}></i>
          </div>
        </div>
    )
}

export default Input;