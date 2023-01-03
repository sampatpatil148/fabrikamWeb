import React,{useEffect}  from "react";
import {isEmpty} from '../../library/common';

const keycache = 'AppData';
const resetSessionKey = 'SessionId';

const getSession =() =>{
    return localStorage.getItem(keycache);
}

const setSession =(val) =>{
    localStorage.setItem(keycache,val);
}

const registerOpenTab = () => {
    let tabInfo = isEmpty(getSession()) ? 0: Math.round(getSession());
    setSession(Math.round(tabInfo + 1));
    //reset session
    if(sessionStorage.getItem("activeSession") === null &&  (parseInt(getSession())===0 || isNaN(parseInt(getSession())))){
        localStorage.removeItem(resetSessionKey);
    }
    sessionStorage.setItem("activeSession", true);
}

const unregisterOpenTab = () => {    
    let tabInfo = isEmpty(getSession()) ? 0: Math.round(getSession());
    setSession(Math.round(tabInfo - 1));
}

const AppEvent = ()=>{
    useEffect(() => {
        window.addEventListener('load', registerOpenTab)
        window.addEventListener('beforeunload', unregisterOpenTab)
        return () => {
            window.removeEventListener('load', registerOpenTab)
            window.removeEventListener('beforeunload', unregisterOpenTab)
        }
    },[])
    return(<></>);
}

export default AppEvent;