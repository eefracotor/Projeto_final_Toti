import React from "react";

export default function Contacto(props){
   return(
      <div className="card--list">
         <h1>{props.name}</h1>
         <p>{props.phone}</p>
         <p>{props.email}</p>
      </div>
   )
};

export function Card(props){
   return(
      <div className="card--contact">
         <h1>{props.name}</h1>
         <p>{props.phone}</p>
         <p>{props.email}</p>
         <p>{props.adress}</p>
         <p>{props.pic}</p>
         <p>{props.id_cont_social}</p>
         <p>{props.id_contact_group}</p>
         <p>{props.id_work}</p>
      </div>
   )
}