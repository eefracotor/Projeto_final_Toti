import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
import ButtonIconF from "./buttoms";
import ButtonIcon from "./buttoms";
import TextField from '@mui/material/TextField';
import { IconCamera } from "./photo/avatar"

export default function AddGroup() {
    //const [open, setOpen] = useState(false);
    const [values, setValues] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [pathImage, setPathImage] = useState('http://localhost:3001/user.png');
    let navigate = useNavigate()

    const handleChange = value => {
        // console.log(value.target.value)
        setValues((prevValue)=> ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
    }

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
    }

    const handleClick = async (e) => {
        // e.preventDefault()
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', values.name);
        formData.append('descrisption', values.descrisption);
        
        // formData.append("fileName", fileName);
        await Axios.post("http://localhost:3001/addgroup", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            // name: values.name,
            // phone: values.phone,
            // email: values.email,
            // adress: values.adress,
        }).then((res) => {
            console.log(res)
        });
        navigate("/group");
    };
   
    /*const handleClickCard = () =>{
        setOpen(true)
    }*/

    return(
        <div className="container--form">
        <div className="btn-nav">
            <ButtonIcon icon="arrow_back_ios" onClick={() => { navigate("/group") }} />
            {/* <ButtonIconF icon="arrow_forward_ios" onClick={() => { navigate("/contactgroup") }} /> */}
        </div>
        <h1>AddGroup</h1>
        <form className="form--add" encType="multipart/form-data">
            {/* <label>Nome</label> */}
            <div className="container--avatar">
                <img className="avatar" src={pathImage} alt="User" />
                <label htmlFor="avatar"><IconCamera src="http://localhost:3001/photo-camera.png" /></label>
            </div>
            <input
                id = "avatar" 
                type={"file"}
                placeholder="avatar"
                name="avatar"
                onChange={onFileChange}
            />
            {/* <input
                type={"text"}
                placeholder="Nome"
                name="name"
                onChange={handleChange}
            /> */}
            <div className="add-group-text">
              <label>
              <img className="photo-icon-form"
                  src="http://localhost:3001/user1.png" 
              />
              </label>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                name="name"
                defaultValue={null}
                onChange={handleChange}
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            <div className="add-group-text">
              <label>
              <img className="photo-icon-form"
                  src="http://localhost:3001/user1.png" 
              />
              </label>
              <TextField
                autoFocus
                margin="dense"
                id="descrisption"
                label="Descrição"
                name="descrisption"
                defaultValue={null}
                onChange={handleChange}
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
              {/* <TextField
                margin="dense"
                id="descrisption"
                name="descrisption"
                label="Descrição"
                defaultValue={null}
                onChange={handleChange}
                type="text"
                fullWidth
                variant="standard"
              /> */}
            {/* <label>Telefone</label> */}
            {/* <input
                type={"text"}
                placeholder="Descrição"
                name="descrisption"
                onChange={handleChange}
            /> */}
            
            <ButtonIconF icon = "save" onClick={() => { handleClick() }} />
            {/*<div className="button-add">
                <ButtonIcon icon="person_add" onClick={() => { handleClickCard() }} />
                
            </div>*/}    
            {/* Salvar</button> */}
        </form>
        </div>
    )
}