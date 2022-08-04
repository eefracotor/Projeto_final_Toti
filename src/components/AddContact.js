import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import ButtonIcon from "./buttoms";
import { IconCamera } from "./photo/avatar";
import FormDialog from "./Dialog";
import { TextField, Icon } from "@mui/material";
// import Icon from "react-icon";
import { useForm } from "../components/TESTE/useForm";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    // comments : ""
 };

const validationsForm = (form) => { // VALUES => 
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPhone = /^.{1,255}$/;
 
    if(!form.name.trim()) { //si el campo esta completamente vacio
       errors.name = "El campo nombre es requerido";
    }else if(!regexName.test(form.name.trim())){
       errors.name = "El campo nombre solo acepta letras y espacios en blanco";
    }
 
    if(!form.email.trim()) { //si el campo esta completamente vacio
       errors.email = "El campo email es requerido";
    }else if(!regexEmail.test(form.email.trim())){
       errors.email = "El cemail es incorrecto";
    }
 
    if(!form.phone.trim()) { //si el campo esta completamente vacio
       errors.phone = "El campo asunto es requerido";
    }
 
    // if(!form.comments.trim()) { //si el campo esta completamente vacio
    //    errors.comments = "El campo nombre es requerido";
    // }else if(!regexComments.test(form.comments.trim())){
    //    errors.comments = "El campo solo acepta 255  caracteres";
    // }
 
    return errors;
 };

export default function AddContact(){
    const [values, setValues] = useState('');
    const [phones, setPhones] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [pathImage, setPathImage] = useState('http://localhost:3001/user.png');
    let navigate = useNavigate();
    // const [errors, setErrors] = useState({})
    

    // const {values, errors,loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm,validationsForm)

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        if(e.target.files && e.target.files.length > 0) {
            const files = e.target.files[0];
            // const filesName = e.target.files[0].name;
            if(files.type.includes('image')){
                const reader = new FileReader()
                reader.readAsDataURL(files)

                reader.onload = function load() {
                    setPathImage(reader.result)
                }
            }
            // setFile(files);
            setFileName(files);
            console.log('file: '+ file);
            // console.log('fileName: '+ filesName);
        }else {
            console.log("there was an error")
        }
    };

    
     const handleChanges = value => {
        // console.log(value.target.value)
        setValues((prevValue)=> ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
    }
    
    //  const handleBlur = (e) => {
    //     handleChange(e);
    //     setErrors(validationsForm(values));  // PENDIENTE FORM
    //  };

    const handleClick = async (e) => {
        // e.preventDefault();
        // setErrors(validationsForm(values));

        if(Object.keys(errors).length === 0){
            alert("Enviadno formulario!!");
            const formData = new FormData();
            formData.append('image', file);
            formData.append('name', values.name);
            formData.append('phone', values.phone);
            formData.append('email', values.email);
            formData.append('adress', values.adress);
            // formData.append("fileName", fileName);
            await Axios.post("http://localhost:3001/addcontact", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                // name: values.name,
                // phone: values.phone,
                // email: values.email,
                // adress: values.adress,
            }).then((res) => {
                console.log(res)
            });
         }else{
            return;
         }
         
        // navigate("/");
    };


    const handleAddPhone = (e) => {
        e.preventDefault();
        console.log("activado!");
        setPhones([...phones,""]);
    }
   
    const handleChangePhone =(e, index) => {
        phones[index] = e.target.value;
        setPhones([...phones])
    }

    const handleRemovePhone = (e, position) => {
        // e.preventDefault();
        e.preventDefault();
        setPhones([...phones.filter((_, index) => index != position)])
    }
    const {form, errors,loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm,validationsForm)


    return(
        <div className="container--form">
            <ButtonIcon
                icon="arrow_back_ios"
                onClick={() => {
                    navigate("/")
                }}
            />
        <h1>AddContact</h1>
        <form className="form--add" encType="multipart/form-data">
            {/* <label>Nome</label> */}
            <div className="container--avatar">
                    <img className="avatar" src={pathImage} alt="User" />
                        <label for="avatar">
                            <IconCamera 
                                src="http://localhost:3001/photo-camera.png" 
                            />
                        </label>
            </div>
            <div className="container--inputs">
                <input 
                    id="avatar"
                    type={"file"}
                    placeholder="avatar"
                    name="avatar"
                    onChange={onFileChange}
                    accept="image/*"
                />
                <div className="textFile">
                    <label>
                        <img className="photo-icon-form"
                            src="http://localhost:3001/user1.png" 
                        />
                    </label>
                    <TextField
                        className="teste"
                        autoFocus
                        type={"text"}
                        placeholder="Nome"
                        name="name"
                        margin="dense"
                        label="Nome"
                        fullWidth 
                        variant="standard"
                        // defaultValue={null}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                {errors.name && <p>{errors.name}</p>}
                {/* <div className="list--phone"> 
                    <div className="container--phone">
                        {phones.map((phone, index) => (
                            <div key={index} className="phone--input" >
                                <img className="photo-icon-form"
                                    src="http://localhost:3001/telephone.png" 
                                />
                                <TextField 
                                    margin="dense"
                                    label={`Telefone ${index+1}`}
                                    fullWidth
                                    variant="standard"
                                    id={`phone-${index+1}`}
                                    type={"text"}
                                    placeholder={`Telefone ${index + 1}`}
                                    name="phone"
                                    value={form.phone}
                                    onChange={(e) => handleChangePhone(e, index)}
                                    // onBlur={handleBlur}

                                />
                                <ButtonIcon
                                    icon ="highlight_off"
                                    onClick = {(e) => handleRemovePhone(e, index)}
                                />
                            </div>

                        ))}
                    </div>
                    <div className="btn-add-phone">
                        <hr />
                        <ButtonIcon
                            className="addPhone"
                            icon="add_ic_call"
                            onClick={handleAddPhone}
                        />
                        <p> Adicionar número de telefone</p>
                    </div>
                </div> */}
                <div className="textFile">
                    <label>
                        <img className="photo-icon-form"
                            src="http://localhost:3001/telephone.png" 
                        />
                    </label>
                    <TextField
                        type={"text"}
                        placeholder="Telefone"
                        name="phone"
                        margin="dense"
                        label="Telefone"
                        fullWidth
                        variant="standard"
                        value={values.phone}
                        // defaultValue={null}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                    /> 
                </div> 
                {errors.phone && <p>{errors.phone}</p>}
                <div className="textFile">
                    <label>
                        <img className="photo-icon-form"
                            src="http://localhost:3001/mail.png" 
                        />
                    </label>
                    <TextField
                        type={"text"}
                        placeholder="seu@email.com"
                        name="email"
                        margin="dense"
                        label="E-mail"
                        fullWidth
                        variant="standard"
                        value={values.email}
                        // defaultValue={null}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                    />                    
                </div>                
                {errors.email && <p>{errors.email}</p>}
                <div className="textFile">
                    <label>
                        <img className="photo-icon-form"
                            src="http://localhost:3001/location.png" 
                        />
                    </label>
                    <TextField
                        type={"text"}
                        placeholder="Endereço"
                        name="adress"
                        margin="dense"
                        label="Endereço"
                        fullWidth
                        variant="standard"
                        defaultValue={null}
                        onChange={handleChange}
                    />
                </div>
                <div className="textFile">
                    <label>
                        <img className="photo-icon-form"
                            src="http://localhost:3001/photo-camera.png" 
                        />
                    </label>
                    <TextField
                        type={"text"}
                        placeholder="Redes social"
                        name="id_cont_social"
                        margin="dense"
                        label="Social Media"
                        fullWidth
                        variant="standard"
                        defaultValue={null}
                        onChange={handleChange}
                    />
                </div>                
                <div className="textFile">
                    <label>
                        <img className="photo-icon-form"
                            src="http://localhost:3001/people.png" 
                        />
                    </label>
                    <TextField
                        type={"text"}
                        placeholder="Grupo"
                        name="id_contact_group"
                        margin="dense"
                        label="Grupo"
                        fullWidth
                        variant="standard"
                        defaultValue={null}
                        onChange={handleChange}
                    />
                </div>
                <div className="textFile">
                    <label>
                        <img className="photo-icon-form"
                            src="http://localhost:3001/suitcase.png" 
                        />
                    </label>
                    <TextField
                        type={"text"}
                        placeholder="Trabalho"
                        margin="dense"
                        label="Trabalho"
                        fullWidth
                        variant="standard"
                        name="id_work"
                        defaultValue={null}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <ButtonIcon
                icon = "save"
                // onClick = {handleClick}
                onClick={() => {
                    // handleClick()
                    handleSubmit()
                }} 
                />
                
            {/* Salvar</button> */}
        </form>
        </div>
    )
}