import React from 'react';

import { getURlarg,removeSpecials } from '../common';

function BreadCrumbs(props) {
    const url = getURlarg();
    const breadcrumbArgument = url.slice(1);
    let linkHref='fabrikam-fashion/';
    return (
        <div className="breadCrumbs">
            <ul>
                {   
                    url[0]!=='pdp' && breadcrumbArgument.map((menu, i) => { 
                        linkHref +=`${menu}/`;
                        return(
                            (breadcrumbArgument.length === (i+1))?
                             breadcrumb_text(`Breadcrumb ${i.toString()}`,menu)
                            :breadcrumb_link(`Breadcrumb ${i.toString()}`,menu,linkHref)
                        );
                    })
                }
                {
                    url[0] === 'pdp' && productBreadCrumb(props)
                }
                
            </ul>
        </div>
    )
}

function breadcrumb_text(key,text){
    return <li className='text-capitalize' key={key} tabIndex="0">{removeSpecials(text)}</li>;
}
function breadcrumb_link(key,text,link,IsArrow=false){
    return(<li className='text-capitalize' key={key}>
            { IsArrow && <i className="fa fa-chevron-left" aria-hidden="true"></i>}
            <a href={`/${link}`} area-label={text} className='ms-breadcrumb-back-button'>{ removeSpecials(text) }</a>
          
        </li>)
}

function productBreadCrumb(props){
    if(props && props.data && Array.isArray(props.data.category1)){
        let linkHref='fabrikam-fashion/';
        const list = props.data.category1.filter((e,i)=>i!==0).map((e,i)=>{
            linkHref +=`${e}/`;
            return breadcrumb_link(i,e,linkHref)
        })
        list.push(breadcrumb_text('last',props.data.productName,'#'))
        return list;
    }
    return '';
}

export default BreadCrumbs