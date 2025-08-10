import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase.js';
import '../chatpage.css';
import { AuthContext } from "../context/authcontext";
import { ChatContext } from "../context/chatcontext";
import Message from './message.js';

const Messages = () => {

    const { currentuser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const chatid = data.chatid;

    const [messages, setmessages] = useState([]);


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", chatid), (doc) => {

            const data = doc.data();

            setmessages(data?.messages || undefined);


        });

        if (chatid) {
            return () => {
                unsub();
            }
        }
    }, [chatid])

    return (
        <div className="flex flex-col gap-4">
            {messages?.map((msg) => (
                <Message key={msg.id} message={msg} />
            ))}
        </div>
    );

}

export default Messages;


