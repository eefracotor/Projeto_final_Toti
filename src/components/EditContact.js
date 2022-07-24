import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Card } from "./contact";
import Button from "./buttoms";
import { FiEdit3 } from "react-icons/fi";



export default function EditContact(){
    const {id} = useParams();
    const URL = `http://localhost:3001/contact/${id}`;

    const [contato, setContato] = useState([]);
    console.log(contato);
    useEffect(() => {
        Axios.get(URL)
        .then((response) => {
            console.log(response);
            setContato(response.data);
        });
    }, [id]);

    //  console.log(contato?.nome)  
    return(
        <div>
            <Button>
                <FiEdit3 />
            </Button>
            <Card 
                key={contato.id}
                name={contato.name}
                phone={contato.phone}
                email={contato.email}
                adress={contato.adress}
                pic={contato.pic}
                id_cont_social={contato.id_cont_social}
                id_contact_group={contato.id_contact_group}
                id_work={contato.id_work}
                
            />
            {/* <Button 
                icon="edit"            
            /> */}
            
        </div>
    )
}