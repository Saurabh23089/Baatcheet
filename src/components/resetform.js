import React,{ useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";

const Resetform = () => {

    const[newpassword,setnewpassword]=useState('');
    const[cp,setcp]=useState('');
    const[error,seterror]=useState('');
    const auth = getAuth();

    const passwordcheck = async(e) =>{
        e.preventDefault();
        if(newpassword===cp){
            
            // Update the Password in firebase
            try{
                await updatePassword(auth.currentUser, newpassword);
            }
            catch(error){
                seterror(error.message);
            }   
        }
        else{
            seterror("Passwords do not match")
        }
    }

    return (
        <div className="parent">
           <input type="password" placeholder="Enter new password" onChange={(e) => {setnewpassword(e.target.value)}}/>
           <input type="password" placeholder="Confirm new password" onChange={(e) => {setcp(e.target.value)}}/>
           <button onClick={(e) => {passwordcheck(e)}}>Reset password</button>
           {error&&<h4>{error}</h4>}
        </div>
    )
}

export default Resetform;