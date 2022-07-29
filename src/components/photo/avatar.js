import React, { useState } from "react";


export default function Avatar(props) {
   return(
      <img className="avatar" src={props.src} alt="User" />
   )
}