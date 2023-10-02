// import 'React' from react;
import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { ChatContext } from "../context/chatcontext";

const Message = ({message}) => {
    const {data}=useContext(ChatContext);
    console.log(data);
    console.log(message);

    const messagedate=message?.date.toDate();
    console.log(messagedate);
    const messagetime=messagedate.toLocaleTimeString();
    console.log(messagetime);

    const hours = messagedate?.getHours();
    const minutes = messagedate?.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
   

    const finaltime=`${formattedHours}:${minutes} ${ampm}`;
    const months=['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    const monthindex=messagedate?.getMonth();
    const year=messagedate?.getFullYear();
    
    const day=messagedate?.getDate();
    const month=months[monthindex];
    const finaldate=`${day} ${month}`;
    console.log(finaltime);
    console.log(finaldate);



    return (
       <div>
         
        <div className="messageinfo">

        <div className="timeandphoto">
         <img src={data?.user.photoURL||""} alt="p1" className="senderimage"/>
         {message.text ? <p className="textmessage">{message.text}</p> : <img src={message?.downloadURL} alt="message" className="imagemessage"/>} 
         </div>
        <span className="messagetime">{finaltime}</span>
           </div>
        </div>    
    )
}

export default Message;