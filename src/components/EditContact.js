import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Card } from "./contact";
import Button from "./buttoms";
import FormDialog from "./Dialog";
import { PropaneSharp } from "@mui/icons-material";



export default function EditContact(){
    const {id} = useParams();
    const URL = `http://localhost:3001/contact/${id}`;
    let navigate = useNavigate()
    
    const [contato, setContato] = useState([]);
    const [open, setOpen] = React.useState(false);
    console.log(contato);
    useEffect(() => {
        Axios.get(URL)
        .then((response) => {
            console.log(response);
            setContato(response.data);
        });
    }, [id]);

    const handleClickCard = () =>{
        setOpen(true)
    }
    //  console.log(contato?.nome)  
    return(
        <div className="container-card">
            <div>
                <Button 
                    icon="arrow_back_ios"
                    onClick={() => {
                        navigate("/")
                    }}
                />
            </div>
            <FormDialog 
                open={open} 
                setOpen={setOpen}
                id={contato.id}
                name={contato.name}
                phone={contato.phone}
                email={contato.email}
                adress={contato.adress}
                pic={contato.pic}
                id_cont_social={contato.id_cont_social}
                id_contact_group={contato.id_contact_group}
                id_work={contato.id_work}
                contato={contato}
                setContato={setContato}
            />
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
            <div className="container--button">
                <Button 
                    onClick={()=>{
                        handleClickCard()
                    }}
                    icon="edit"            
                />
                <Button 
                    icon="delete"            
                />
            </div>

            
        </div>
    )
}