import React, { useState } from "react"
import Axios from "axios";

export default function AddContact(){
    const [values, setValues] = useState('');

    const handleChange = value => {
        // console.log(value.target.value)
        setValues((prevValue)=> ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
    }
    const handleClick = () => {
        // e.preventdefault
        // console.log(values)
        Axios.post("http://localhost:3001/addcontact", {
            name: values.name,
            phone: values.phone,
            email: values.email,
            adress: values.adress
        }).then((response) => {
            console.log(response)
        });
    };

    return(
        <>
        
        <h1>AddContact</h1>
        <form>
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
            <button onClick={() =>handleClick()}>Salvar</button>
        </form>
        </>
    )
}