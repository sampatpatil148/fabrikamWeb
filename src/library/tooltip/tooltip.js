import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from "react-bootstrap/Tooltip";

const ToolTip = (props) => {
    // const renderTooltip = (props) => (
    //     <Tooltip  {...props}>
    //         <span className={ 'asdas' + props.text}> { props.text} ffff </span>
    //   </Tooltip>
    // );
    
    return (
        <OverlayTrigger
        delay={{ show: 100, hide: 100 }}
        overlay={<Tooltip>{ props.text }</Tooltip>}
      >
            {props.children}
      </OverlayTrigger>
        );
    
}

export default ToolTip;