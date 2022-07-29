import React from "react";
import PhotoList, { PhotoCard } from "./photo/Photo";

export default function Contacto(props){
   return(
      <div className="card--list">
         <PhotoList
            src = 'http://localhost:3001/user.png'
         />
         <h1>{props.name}</h1>
         <p>{props.phone}</p>
         <p>{props.email}</p>
      </div>
   )
};

export function Card(props){
   return(
      <div className="card--contact">
         <PhotoCard 
            src = 'http://localhost:3001/user.png'
         />
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