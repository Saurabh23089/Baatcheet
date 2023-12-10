import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from '../firebase'

export const AuthContext = createContext();

export const AuthContextprovider = ({ children }) => {
    const [currentuser, setcurrentuser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setcurrentuser(user);
            // console.log(user);
        });

        return () => {
            unsub();
        }
    }, []);


    return (
        <AuthContext.Provider value={{ currentuser }}>
            {children}
        </AuthContext.Provider>
    )

};