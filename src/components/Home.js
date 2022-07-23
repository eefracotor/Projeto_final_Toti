import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Contacto from "./contact";


export default function Home() { 
    const [contato, setContact] = useState([]);
    // const URL = "http://localhost:3001/contactlist";
    console.log(contato);
    useEffect(() => {
        // const getData = async () => {
        //     const response = await Axios.get(URL)
        //     setContact(response.data)
        //   }
        //   getData();
        Axios.get("http://localhost:3001/list")
        .then((response) => {
            console.log(response);
            //setContact(response.data);
        });
        // const getData = async () => {
        //     const response = await Axios.get(URL);
        //     const contacto = response.data
        //     console.log("data: "+ {contacto})
        //     setContact(contacto);
        //     };
        //     getData();
    }, []);
    
    return (
        <div>
            <h1> Lista de Conatos</h1>
            <Link to="/addcontact">
                <p>AddContact</p>
            </Link>
            <div>
                {typeof contato !== "undefined" && contato.map((value) => {
                    return <Contacto></Contacto>;
                })}
            </div>
        </div>
    )
}

