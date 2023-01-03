import React,{useState} from "react";
import {isEmpty} from '../../library/common'
const SessionId='AcceptC';
function TopHeader() {
    const [acceptCookies,acceptSet ] = useState(sessionStorage.getItem(SessionId))
    
    const checkSession = ()=>{   
        if(isEmpty(acceptCookies)){
            sessionStorage.setItem(SessionId,'true');
            acceptSet('true')
        }
    }
    return (
        <>
        {
            isEmpty(acceptCookies) && <section className="topHeader">
                <div className="default-container default-container__0 container d-flex">
                    <div className="content">
                        <p>This site uses cookies for analytics and personalized content. Accept to continue.</p>
                        <a href="#">Learn more</a>
                    </div>
                    <div className="cookie-accept">
                        <button type="button" className="msc-cta__primary" onClick={checkSession}>Accept</button>
                    </div>
                </div>
            </section>
        }
        </>
    )
}

export default TopHeader;