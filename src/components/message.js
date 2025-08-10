import { useContext, useRef, useEffect, useState } from "react";
import { ChatContext } from "../context/chatcontext";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

const Message = ({ message }) => {
    const [senderimage, setsenderimage] = useState("");
    const { data } = useContext(ChatContext);

    const messagedate = message?.date.toDate();
    const messagetime = messagedate.toLocaleTimeString();
    const hours = messagedate?.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";

    const months = {
        "0": "Jan",
        "1": "Feb",
        "2": "March",
        "3": "April",
        "4": "May",
        "5": "June",
        "6": "July",
        "7": "August",
        "8": "Sep",
        "9": "Oct",
        "10": "Nov",
        "11": "Dec"
    }

    var time = '';

    if (messagedate.toLocaleTimeString().slice(0, 2).includes(':')) {
        time = messagetime.slice(0, 4);
    }

    else {
        time = messagetime.slice(0, 5);
    }

    var finaltime = '';

    if (messagedate.getMonth() != new Date().getMonth() || messagedate.getDate() != new Date().getDate()) {
        finaltime = `${time} ${ampm}` + `, ${messagedate.getDate()} ${months[messagedate.getMonth()]} ${messagedate.getFullYear()}`;
    }

    else {
        finaltime = `${time} ${ampm}`;
    }

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: 'smooth' });
    }, [message])

    useEffect(() => {
        const fetchsenderimage = async () => {
            const userDocRef = doc(db, 'users', message.senderId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setsenderimage(userDoc.data()?.photoURl);

            }
        }



        if (message) {
            fetchsenderimage();

        }
    }, [message])

    return (
        <div ref={ref} className="mb-4">
            <div className="flex items-start gap-3">
                <img
                    src={senderimage}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="bg-gray-100 rounded-xl px-4 py-2 max-w-[75%]">
                    {message?.text && (
                        <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                            {message.text}
                        </p>
                    )}
                    {message?.downloadURL && (
                        <img
                            src={message.downloadURL}
                            alt="attachment"
                            className="mt-2 rounded-md max-w-full"
                        />
                    )}
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-12">{finaltime}</p>
        </div>
    );

}

export default Message;