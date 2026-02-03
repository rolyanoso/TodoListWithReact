import { createContext, useContext } from "react";
import { useState } from "react";
import MySnak from "../mySnakBar";

const ToastContext = createContext({})

export const ToastProvider = ({children}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState();
    

    function showHideToast(message){
        setOpen(true);
        setMessage(message);
        setTimeout(()=>{
          setOpen(false)
        },2000);
    }
    return(
        <ToastContext.Provider value={{showHideToast}} >
            <MySnak open={open} message={message}/>;
            {children}
        </ToastContext.Provider>
    );
    
}

export const useToast = ()=>{
   return useContext(ToastContext)
};