import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import ButtonIcon from "./buttoms";
import { IconCamera } from "./photo/avatar";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormAddContact (props) {
   const handleClose = () => {
      props.setOpen(false);
   };

   const [values, setValues] = useState('');
    const [phones, setPhones] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [pathImage, setPathImage] = useState('http://localhost:3001/user.png');
    let navigate = useNavigate()

    const handleChange = value => {
        setValues((prevValue)=> ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
    }

    const onFileChange = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            const files = e.target.files[0];
            if(files.type.includes('image')){
                const reader = new FileReader()
                reader.readAsDataURL(files)

                reader.onload = function load() {
                    setPathImage(reader.result)
                }
            }
            setFile(files);
            setFileName(files);
            console.log('file: '+ file);
        }else {
            console.log("there was an error")
        }
    }

    const handleClick = async (e) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', values.name);
        formData.append('phone', phones);
        formData.append('email', values.email);
        formData.append('adress', values.adress);
        await Axios.post("http://localhost:3001/addcontact", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then((res) => {
            console.log(res)
        });
        navigate("/");
        handleClose();
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
        e.preventDefault();
        setPhones([...phones.filter((_, index) => index != position)])
    }


   return (
      <div>
      <Dialog 
         open={props.open} 
         onClose={handleClose}
         fullWidth
         maxWidth="sm"
      >
        <DialogTitle>
            Criar Contato
         </DialogTitle>
        <DialogContent>
        <form  encType="multipart/form-data">

          <div className='contact--modal'>
              <div className="container--avatar">
                <img className="avatar" src={pathImage} alt="User" />
                <label htmlFor="avatar1">
                  <IconCamera 
                    src="http://localhost:3001/photo-camera.png" 
                  />
                </label>
              </div>
              <input 
                id="avatar1"
                type={"file"}
                placeholder="avatar"
                name="avatar1"
                onChange={onFileChange}
                accept="image/*"
              />
          </div>
            <TextField
              disabled
              margin="dense"
              id="id"
              label="ID"
              defaultValue={props.id}
              type="text"
              fullWidth
              variant="standard"
            />
            <div className="textFile">
              <label>
              <img className="photo-icon-form"
                  src="http://localhost:3001/user1.png" 
              />
              </label>
              <TextField
                autoFocus
                type={"text"}
                placeholder="Nome"
                name="name"
                margin="dense"
                label="Nome"
                fullWidth 
                variant="standard"
                defaultValue={null}
                onChange={handleChange}
              />
            </div>

            <div className="list--phone"> 
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
                           value={phone}
                           onChange={(e) => handleChangePhone(e, index)}
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
            </div>

            <div className="textFile">
            <  label>
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
                  defaultValue={null}
                  onChange={handleChange}
               />
            </div>
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
          </form>
        </DialogContent>
        <DialogActions>
            <ButtonIcon
               icon = "cancel"
               onClick={handleClose}
            /> 
            {/* <ButtonIcon
               icon = "delete"
               onClick={()=>{
                  // handleDelete()
               }}
            /> */}
            <ButtonIcon
               icon = "save"
               onClick={() => {
                  handleClick()
               }}
            />
        </DialogActions>
      </Dialog>
    </div>
   )
}