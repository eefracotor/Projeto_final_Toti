import { Icon } from "@mui/material";
import React from "react";
// import { FiEdit3 } from "react-icon/fi";
//import { Icon } from '@mui/icons-material/Home';

export default function Button(props) {
    return(
        <button onClick={props.onClick} type={props.type} className="buttom" >
            <Icon>{props.icon}</Icon>
        </button>
    )
}


/*export default function HomeIcon(props) {
    return(
        <button onClick={props.onClick} type={props.type} className="buttom" >
            <Icon>{props.icon}</Icon>
        </button>
    )
}*/