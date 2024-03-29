import { createContext, useReducer, useContext } from "react";
import { AuthContext } from "./authcontext";



export const ChatContext = createContext();

export const ChatContextprovider = ({ children }) => {
    const { currentuser } = useContext(AuthContext);

    // console.log(currentuser);

    const initial_state = {
        chatid: "null",
        user: {}
    }

    

    const chatreducer = (state, action) => {
        switch (action.type) {
            case "changeuser":
                // console.log(currentuser);
                // console.log(action.payload);
                return {
                    user: action.payload,
                    chatid: currentuser.uid > action.payload.uid ? currentuser.uid + action.payload.uid : action.payload.uid + currentuser.uid
                }

            case "reset":{
                return initial_state;
            }

            default:
                return state;
        }
    }




    const [state, dispatch] = useReducer(chatreducer, initial_state);





    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )

};