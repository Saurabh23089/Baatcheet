import React, { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ChatContext } from "../context/chatcontext";
import { AuthContext } from "../context/authcontext";
import { db } from "../firebase.js";
import { v4 as uuid } from 'uuid';

const Input = () => {

  const currentuser = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, settext] = useState('');
  const [img, setimg] = useState(null);
  const [imgfilename, setimgfilename] = useState('');

  const sendmessage = async () => {

    if (data.chatid === "null") return;


    if (data.chatid != null && img) {
      console.log(img);
      const storage = getStorage();
      const storageref = ref(storage, uuid())
      const uploadtask = uploadBytesResumable(storageref, img);
      uploadtask.on(
        (error) => {
          console.log(error.message);
        },

        () => {
          getDownloadURL(uploadtask.snapshot.ref)
            .then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data?.chatid), {
                messages: arrayUnion({
                  id: uuid(),
                  downloadURL,
                  senderId: currentuser.currentuser.uid,
                  date: Timestamp.now()
                })
              })
              setimg(null);
              setimgfilename('');
            })
            .catch((error) => {
              console.log(error);
            })
        }
      )
    }
    if (data.chatid != null && text != '') {
      // console.log(text);
      await updateDoc(doc(db, "chats", data?.chatid), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentuser.currentuser.uid,
          date: Timestamp.now()
        })
      })

      settext("");
    }
  }

  const handleimagechange = (e) => {
    e.preventDefault();
    setimgfilename(e.target.files[0].name);
    setimg(e.target.files[0]);
  }

  return (
    <div className="lastinput">
      <textarea name="text" value={text} onChange={(e) => { settext(e.target.value) }} className="inputbox" placeholder={imgfilename ? imgfilename : "Start Baatcheet..."}>Type a message ...
      </textarea>
      <div className="inputicons">
        <label>
          <i className="bi bi-file-image customicon"></i>
          <input type="file" accept="/image*" className="imagesendinput" onChange={handleimagechange}></input>
        </label>
        <button className="sendbtn" onClick={sendmessage}>Send</button>


      </div>
    </div>
  )
}

export default Input;