import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import Button from "./buttoms";
//import HomeIcon from '@mui/icons-material/Home';

export default function AddContact(){
    const [values, setValues] = useState('');
    let navigate = useNavigate()

    const handleChange = value => {
        // console.log(value.target.value)
        setValues((prevValue)=> ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
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
         {/*<HomeIcon icon="home_icon" onClick={() => { navigate("/") }} />*/} 
        <h1>AddContact</h1>
        <form className="form--add">
            {/* <label>Nome</label> */}
            <input
                type={"text"}
                placeholder="Nome"
                name="name"
                onChange={handleChange}
            />
            {/* <label>Telefone</label> */}
            <input
                type={"text"}
                placeholder="Telefone"
                name="phone"
                onChange={handleChange}
            />
            {/* <label>Email</label> */}
            <input
                type={"text"}
                placeholder="seu@email.com"
                name="email"
                onChange={handleChange}
            />
            {/* <label>Endereço</label> */}
            <input
                type={"text"}
                placeholder="Endereço"
                name="adress"
                onChange={handleChange}
            />
             {/* <label>Imagem</label> */}
            <input
                type={"text"}
                placeholder="Imagem"
                name="pic"
                onChange={handleChange}
            />
             {/* <label>Social Midia</label> */}
            <input
                type={"text"}
                placeholder="Redes social"
                name="id_cont_social"
                onChange={handleChange}
            />
             {/* <label>Grupo</label> */}
            <input
                type={"text"}
                placeholder="Grupo"
                name="id_contact_group"
                onChange={handleChange}
            /> {/* <label>trabalho</label> */}
            <input
                type={"text"}
                placeholder="Trabalho"
                name="id_work"
                onChange={handleChange}
            />

            <button onClick={() =>handleClick()}>Salvar</button>
        </form>
        </div>
    )
}