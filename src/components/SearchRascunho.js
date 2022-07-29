import Button from "./buttoms";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
/*import { LocalLaundryServiceSharp } from "@mui/icons-material";

/*import { Link } from "react-router-dom";*/

export default function SearchContact() {
       
        const navigate = useNavigate()
        const [values, setValue] = useState("")
        const [pesquisaContato, setPesquisaContato] = useState("")
        const URL = "http://localhost:3001/searchcontact"
        
        useEffect(() => {
            Axios.get(URL)
            .then((response) => setValue(response.data))  
            .catch ((err) => {
                console.log("Ocorreu um erro" +err);
            });
            
        }, []);

        
        const handleSearch = async(e) => {
            e.preventDefault()
              fetch(`http://localhost:3001/searchcontact?=${pesquisaContato}`)
              .then(response => response.json())
              .then(result => {
                console.log(result)
                setPesquisaContato("")
                setValue(result)
              })
        }


        const handleClick = () => {
            Axios.post("http://localhost:3001/addcontact", {
                name: values.name,
                phone: values.phone,
                email: values.email,
                adress: values.adress
            }).then((response) => {
                console.log(response)
            });
            navigate("/");
        };
        
        
        
        
        return(
            <div className="container--form">
                <Button icon="arrow_back_ios" onClick={() => { navigate("/") }} />
                <h1>SearchContact</h1>
                <form onSubmit={handleSearch}>
                    {/* <label>Nome</label> */}
                    <input
                        type={"text"}
                        placeholder="Nome do contato"
                        name="name"
                        onChange={(e)=>setPesquisaContato(e.target.value)}
                    />
                    {/* <label>Telefone</label> */}
                    <input
                        type={"text"}
                        placeholder="Telefone do contato"
                        name="phone"
                        onChange={(e)=>setPesquisaContato(e.target.value)}
                    />
                    {/* <label>Email</label> */}
                    <input
                        type={"text"}
                        placeholder="Email do contato"
                        name="email"
                        onChange={(e)=>setPesquisaContato(e.target.value)}
                    />
                    {/* <label>Endereço</label> */}
                    <input
                        type={"text"}
                        placeholder="Endereço do contato"
                        name="adress"
                        onChange={(e)=>setPesquisaContato(e.target.value)}
                    />
                    {/* <label>Imagem</label> */}
                    <input
                        type={"text"}
                        placeholder="Imagem do contato"
                        name="pic"
                        onChange={(e)=>setPesquisaContato(e.target.value)}
                    />
                    {/* <label>Social Midia</label> */}
                    <input
                        type={"text"}
                        placeholder="Rede social do contato"
                        name="id_cont_social"
                        onChange={(e)=>setPesquisaContato(e.target.value)}
                    />
                    {/* <label>Grupo</label> */}
                    <input
                        type={"text"}
                        placeholder="Grupo"
                        name="id_contact_group"
                        onChange={(e)=>setPesquisaContato(e.target.value)}
                    /> {/* <label>trabalho</label> */}
                    <input
                        type={"text"}
                        placeholder="Trabalho do contato"
                        name="id_work"
                        onChange={(e)=>setPesquisaContato(e.target.value)}
                    />

                    <button onClick={() =>handleClick()}>Salvar</button>
                </form>
            </div>
        )
}    
    
    
    
    
