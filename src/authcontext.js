// import { createContext } from "react";

// const authcontext=createContext();
// export default authcontext;

import React,{ createContext, useState,Provider } from 'react';

// Create a new React Context for authentication
const authcontext = createContext();

const AuthProvider = ({children}) => {
  const [uid, setuid] = useState('');
  const [profilepicture, setProfilePicture] = useState(''); // Add profilepicture state

  // ... (other authentication-related functions)

  // Provide the user state and any authentication functions to the children
  return (
    <authcontext.Provider value={{ uid, setuid, profilepicture, setProfilePicture }}>
      {children}
    </authcontext.Provider>
  );
};

export { authcontext, AuthProvider };
