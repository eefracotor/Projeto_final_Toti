import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "./buttoms";
import Contacto from "./contact";


export default function Home() { 
    const [contato, setContact] = useState([]);
    const URL = "http://localhost:3001/list";

    let navigate = useNavigate()
    console.log(contato);
    useEffect(() => {
        Axios.get(URL)
        .then((response) => {
            console.log(response);
            setContact(response.data);
        });
    }, []);
    
    return (
        <div className="home">
            <h1> Lista de Conatos</h1>
            <Button
                icon="person_add"
                onClick={() => {
                    navigate("/addcontact")
                }}
            />

            {/* <Link to="/addcontact">
                <p>AddContact</p>
            </Link>
            <Link to="/contact/">
                <p>EditContact</p>
            </Link> */}
            <div>
                {typeof contato !== "undefined" && contato.map((contact) => {
                    return (
                        <Link to={`/contact/${contact.id}`} >
                            <Contacto
                                key={contact.id}
                                name={contact.name}
                                phone={contact.phone}
                                email={contact.email}
                            ></Contacto>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

