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


        await updateDoc(doc(db, "userchats", currentuser.uid), {
          [cid + ".userInfo"]: {
            uid: user.uid,
            photoURL: user.photoURl,
            displayName: user.displayName,
          },
          [cid + ".dateinfo"]: serverTimestamp()
        });



        await updateDoc(doc(db, "userchats", user.uid), {
          [cid + ".userInfo"]: {
            uid: currentuser.uid,
            photoURL: currentuser.photoURL,
            displayName: currentuser.displayName,
          },
          [cid + ".dateinfo"]: serverTimestamp()
        })
      }
    } catch (error) {
      console.log(error.message);
    }

    setuser(null);
    setusername("");

  }

  return (
    currentuser && (
      <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-black-900 ">Chats</h2>
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            {/* <i className="bi bi-plus-lg text-xl text-gray-600 dark:text-gray-300"></i> */}
          </button>
        </div>

        {/* Search */}
        <div className="px-2 py-3 border-b border-gray-200 dark:border-gray-800">
          <form onSubmit={handlesearch}>
            <input
              type="text"
              placeholder="Search user"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </form>

          {/* Found User */}
          {user && (
            <div
              onClick={handleselect}
              className="flex items-center mt-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <img
                src={user.photoURl}
                alt="user"
                className="w-9 h-9 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{user.displayName}</p>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-2">User not found!</p>}
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto flex-1 ">
          {Object.entries(chats)?.map((chat) => {
            const chatId = chat[1][0];
            const userInfo = chat[1][1].userInfo;
            const lastMsg = lastmessage?.[chatId];
            const isActive = activechat === userInfo?.uid;

            return (
              <div
                key={chatId}
                onClick={() => selectuser(userInfo)}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border-b m-2 rounded-lg ${isActive ? "bg-gray-100 dark:bg-gray-600" : ""
                  }`}
              >
                {/* Avatar + Info */}
                <div className="flex items-center space-x-3">
                  {userInfo.photoURL ? (
                    <img
                      src={userInfo.photoURL}
                      alt={userInfo.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {userInfo.displayName?.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900 dark:text-black">
                      {userInfo.displayName}
                    </p>

                    {lastMsg && lastMsg.includes("https://firebasestorage.googleapis.com") ? (
                      <div className="flex items-center left-4 dark:text-gray-400">
                        <i className="bi bi-camera " /> <span className='ml-2'>Photo</span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-44">
                        {lastMsg || "Start a chat"}
                      </p>
                    )}
                  </div>

                </div>

                {/* Time / Badge */}
                <div className="text-right relative">
                  <p className="text-xs text-gray-500 dark:text-gray-400 overflow-hidden"></p>
                  {/* Optional unread badge */}
                  {/* <span className="inline-block text-xs bg-purple-600 text-white rounded-full px-2 py-0.5">1</span> */}
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Tabs */}
        <div className="flex justify-around items-center border-t border-gray-200 dark:border-gray-800 py-[13px] h-fit">
          <i className="bi bi-chat-dots-fill text-4xl text-purple-600" />
          {/* <i className="bi bi-telephone text-xl text-gray-400 dark:text-gray-500" />
          <i className="bi bi-person text-xl text-gray-400 dark:text-gray-500" />
          <i className="bi bi-people text-xl text-gray-400 dark:text-gray-500" /> */}
        </div>
      </div>
    )
  );


}

export default Leftportion; 