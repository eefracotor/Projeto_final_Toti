// import Icon from '@mui/material/Icon';
import React from "react";
// import { FiEdit3 } from "react-icon/fi";

export default function Button(props) {
    return(
        <button onClick={props.onClick} type={props.type} className="buttom" >
            {/* <Icon>{props.icon}</Icon> */}
        </button>
    )
}
