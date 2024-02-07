import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../chatpage.css';
import { AuthContext } from '../context/authcontext';
import { db } from '../firebase.js';
import { doc, collection, query, where, getDoc, getDocs, onSnapshot, addDoc, setDoc, QuerySnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ChatContext } from '../context/chatcontext';

const Leftportion = () => {

  const [username, setusername] = useState("");
  const [user, setuser] = useState('');
  const [error, seterror] = useState("");
  const [enter, setenter] = useState('');
  var isMounted = useRef(true);
  const [currrentuser, setcurrrentuser] = useState('');
  const [activechat, setactivechat] = useState(null);

  const messages = useContext(ChatContext);

  const auth = getAuth();


  const [chats, setchats] = useState([]);
  const [lastchat, setlastchat] = useState([]);
  var q = "";
  var dataarray = [];

  var data = '';


  const navigate = useNavigate();
  const { currentuser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {

    const fetchData = async () => {
      const usersref = collection(db, 'users');

      if (currentuser.displayName != username) {
        q = query(usersref, where('displayName', '==', username));
      }


      try {
        const querysnapshot = await getDocs(q);
        if (isMounted.current) {
          if (querysnapshot.size === 0) {
            seterror(true);
          }
          querysnapshot.forEach((doc) => {
            data = doc.data();

            setuser((prevuser) => doc.data()); // Update the user state
          });
        }



      } catch (error) {
        if (username != currentuser.displayName && isMounted.current) {
          seterror(true);


        }
      }
    };

    if (enter) {
      console.log("check");
      fetchData();
      setenter('');
      setusername('');
    }


  }, [enter]);


  // In case no user found then it should disappear 5 seconds after
  useEffect(() => {
    const timeoutid = setTimeout(() => {
      seterror(false);
    }, 7000);

    return () => {
      clearTimeout(timeoutid);
    }
  }, [error])



  const selectuser = (data) => {
    setactivechat(data.uid);
    dispatch({ type: "changeuser", payload: data });

  }


  useEffect(() => {
    let unsub;

    const fetchdata = async () => {
      try {
        if (currentuser) {
          unsub = onSnapshot(doc(db, "userchats", currentuser.uid), (doc) => {

            const data = doc.data();


            setchats(Object.entries(data));

          });
        }



        if (unsub) {
          return () => {
            unsub();
          }

        }
      } catch (error) {

        console.log(error.message);
      }
    }

    currentuser.uid && fetchdata();
  }, [currentuser])


  const [lastmessage, setlastmessage] = useState("");
  const [lc, setlc] = useState();


  useEffect(() => {

    chats && chats.forEach((chatid) => {

      const unsub = onSnapshot(doc(db, "chats", chatid[0]), (doc) => {

        const data = doc.data();

        const chatuid = chatid[0];

        if (data) {
          dataarray = Object.entries(data);
        }

        const usermessage = dataarray[0][1];




        const lm = usermessage[usermessage.length - 1];

        var lastchat = '';
        if (lm && lm.text) {
          lastchat = lm.text;
        }

        else if (lm && lm.downloadURL) {
          lastchat = lm.downloadURL;
        }

        // console.log(lastchat);
        setlc(lastchat);
        setlastmessage((previousvalue) =>
        ({
          ...previousvalue,
          [chatuid]: lastchat
        })
        )


        return () => {
          unsub();
        }

      });

    })


  }, [chats])

  console.log("Welcome to Baatcheet");


  const showchat = () => {
    for (let i = 0; i < lastmessage.length; i++) {
      return lastmessage[i];
    }
  }


  const message = useContext(ChatContext);

  useEffect(() => {

    const lastchat = async () => {

      try {
        const unsub = onSnapshot(doc(db, "userchats", currentuser.uid), (doc) => {

        })

        return () => {
          unsub();
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }



    if (currentuser.uid) {
      lastchat();
    }

  })


  var activeChatId = "";

  const handlesearch = (e) => {
    e.preventDefault();
    setenter(true);
  }



  const handleselect = async () => {

    const cid = currentuser.uid > user.uid ? currentuser.uid + user.uid : user.uid + currentuser.uid;


    try {

      const response = await getDoc(doc(db, "chats", cid));


      if (!response.exists()) {

        await setDoc(doc(db, "chats", cid), { messages: [] })


        console.log("userInfo:", {
          uid: user.uid,
          photoURL: user.photoURl,
          displayName: user.displayName,
        });


        await updateDoc(doc(db, "userchats", currentuser.uid), {
          [cid + ".userInfo"]: {
            uid: user.uid,
            photoURL: user.photoURl,
            displayName: user.displayName,
          },
          [cid + ".dateinfo"]: serverTimestamp()
        });


        console.log("CID:", cid);
        console.log("userInfo:", {
          uid: user.uid,
          photoURL: user.photoURl,
          displayName: user.displayName,
        });


        await updateDoc(doc(db, "userchats", user.uid), {
          [cid + ".userInfo"]: {
            uid: currentuser.uid,
            photoURL: currentuser.photoURL,
            displayName: currentuser.displayName,
          },
          [cid + ".dateinfo"]: serverTimestamp()
        })
        console.log("Solve ho jaa yaar");
      }
    } catch (error) {
      console.log(error.message);
    }

    setuser(null);
    setusername("");

  }



  return (currentuser &&
    <div className='parent'>



      <div className='nav'>
        <span className='apptitle'>BaatCheet</span>
        <div className='cudetails'>
          <span className='name'>{currentuser.displayName}</span>

        </div>

      </div>


      <div className='fnd'>
        <form onSubmit={handlesearch}>
          <input type="text" placeholder='Find a user' value={username} onChange={(e) => { setusername(e.target.value) }} className='searchbar' />
        </form>

        {user && <div onClick={handleselect} className="usersearch">
          <img src={user.photoURl} alt='chat1' className='sm' />
          <span className='user1'>{user.displayName}</span>
        </div>}
        {error && <div className="notfound">User not Found!</div>}
      </div>

      <div className='mychats'>
        {Object.entries(chats)?.map((chat, index) => {

          return (
            <div className={`contacts ${activechat == chat[1][1]?.userInfo?.uid ? "activechat" : ""}`} key={chat[1][0]} onClick={() => { selectuser(chat[1][1].userInfo) }}>
              <img src={chat[1][1].userInfo.photoURL} alt="profilephto" className='pf1' />
              <span className='user1'>{chat[1][1].userInfo.displayName}</span>
              {lastmessage && lastmessage[chat[1][0]] && lastmessage[chat[1][0]].includes("https://firebasestorage.googleapis.com") ? <i className="bi bi-camera">Photo</i> : <p className='lastchat'>{lastmessage[chat[1][0]]}</p>}
            </div>
          )
        })
        }

      </div>
    </div>

  )
}

export default Leftportion; 