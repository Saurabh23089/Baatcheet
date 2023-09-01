import { getAuth, signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { Navigate,useNavigate} from 'react-router-dom';
import '../chatpage.css';
import { AuthContext } from '../context/authcontext';
import Login from './login.js';


const Leftportion=()=>{

  const navigate=useNavigate();
  const{currentuser}=useContext(AuthContext);
  console.log(currentuser);

  // var Name="";
  // var url="";

  // useEffect(() => {
  //    Name=currentuser.displayName;
  //    url=currentuser.photoURL;
  //    console.log(url);
  //    console.log(Name);
  // },[currentuser])

  


  const logout=()=>{
    const auth=getAuth();
    signOut(auth).then(() => {
      console.log("signout successfull");
      navigate('/Login');
      
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

    return (
        <div className='toppart'>
            <span className='apptitle'>BaatCheet</span>  
              <div className='one'>
                  {/* {currentuser.photoURL?<img src={url} alt='pp'/>:<img src={url} alt='pp'/>} */}
                  <span className='name'>{currentuser.displayName}</span>
                  <button className='bn' onClick={logout}>Logout</button>
              </div>
              <input type="text" placeholder='Find a user' className='searchbar'/>
              <div className="mychats">
                <img src="https://image.shutterstock.com/image-photo/pastoral-green-field-long-shadows-260nw-275372477.jpg" alt='chat1' className='pf1'/>
                <span className='user1'>Shubham Tiwari</span>
                <p className='lastchat'>Hello</p>
                <img src="https://image.shutterstock.com/image-photo/pastoral-green-field-long-shadows-260nw-275372477.jpg" alt='chat1' className='pf1'/>
                <span className='user1'>Shubham Tiwari</span>
                <p className='lastchat'>Hello</p>
                <img src="https://image.shutterstock.com/image-photo/pastoral-green-field-long-shadows-260nw-275372477.jpg" alt='chat1' className='pf1'/>
                <span className='user1'>Shubham Tiwari</span>
                <p className='lastchat'>Hello</p>
                <img src="https://image.shutterstock.com/image-photo/pastoral-green-field-long-shadows-260nw-275372477.jpg" alt='chat1' className='pf1'/>
                <span className='user1'>Shubham Tiwari</span>
                <p className='lastchat'>Hello</p>
              </div>
              
            </div>
       
    )
}

export default Leftportion; 