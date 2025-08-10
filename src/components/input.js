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
    <div className="flex items-center gap-2 px-3 py-2 border-t bg-white dark:bg-gray-800">

      {/* Text Input */}
      <textarea
        name="text"
        rows={1}
        value={text}
        onChange={(e) => settext(e.target.value)}
        placeholder={imgfilename ? imgfilename : "Start Baatcheet..."}
        className="flex-grow resize-none rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm h-12 focus:outline-none"
      />

      {/* Image Upload */}
      <label className="cursor-pointer text-gray-500 hover:text-gray-700">
        <i className="bi bi-file-image text-lg"></i>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleimagechange}
        />
      </label>

      {/* Send Button */}
      <button
        onClick={sendmessage}
        className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition"
      >
        <i className="bi bi-send-fill"></i>
      </button>
    </div>
  )
}

export default Input;