import App from '../App.css'; 
import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "./buttoms";
import Contacto from "./contact";
import SearchContact from "./Search";
//import SearchIcon from '@mui/icons-material/Search';

export default function Home() { 
    const [contato, setContact] = useState([]);
    const URL = "http://localhost:3001/list";

    let navigate = useNavigate()
    console.log(contato);
    useEffect(() => {
        Axios.get(URL)
        .then((response) => {
            console.log(response);
            const listOrd = response.data;
            listOrd.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0 ))
            setContact(listOrd);
        });
    }, []);
    
    return (
        <div className="home">
            
            <div className="form--search">
                <form onSubmit = {SearchContact}>
                    <h4>Pesquise o nome de um contato</h4>
                    <input
                        type={"text"}
                        placeholder = "Digite o nome do contato"
                        name = "name"
                        //onChange = 
                    />
                </form>
            </div>
            
            <h1> Lista de Contatos</h1>
            <Button icon="person_add" onClick={() => { navigate("/addcontact") }} />
            {/*<SearchIcon icon="search_icon" onClick={() => { navigate("/searchcontact")}} />*/} 

            {/* <Link to="/addcontact">
                <p>AddContact</p>
            </Link>
            <Link to="/contact/">
                <p>EditContact</p>
            </Link> */}
            <div className="lista--contact">
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

