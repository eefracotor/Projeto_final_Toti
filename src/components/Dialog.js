import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import Axios from "axios";
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonIcon from './buttoms';
import { Icon } from "@mui/material";

export default function FormDialog(props) {
  props.pic ? URL = `http://localhost:3001/${props.pic}` : URL = 'http://localhost:3001/user.png'
  const [pathImage, setPathImage] = useState(URL);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState()

   let navigate = useNavigate();
  //  let URL = `http://localhost:3001/${props.id}` 


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
   const handleClose = () => {
      props.setOpen(false);
   };

      const [editValue, setEditValue] = useState({
      id: props.id,
      name: props.name,
      phone: props.phone,
      email: props.email,
      adress: props.adress,
      // pic: props.pic,
      id_cont_social:props.id_cont_social,
      id_contact_group: props.id_contact_group,
      id_work:  props.id_work,
   });

  const handleChangeValues = (values) => {
   setEditValue({
      ...props,
      [values.target.id]: values.target.value,
   })
   };

  const handleSaveChange = () => {
   let isSave = window.confirm(
      "Desea guardar los cambios realizados?"
   )
   
   if(isSave) {
    const formData = new FormData();
        formData.append('image', file);
        formData.append('name', editValue.name);
        formData.append('phone', editValue.phone);
        formData.append('email', editValue.email);
        formData.append('adress', editValue.adress);
        formData.append('id_cont_social', editValue.id_cont_social);
        formData.append('id_contact_group', editValue.id_contact_group);
        formData.append('id_work', editValue.id_work);
      Axios.post(`http://localhost:3001/edit`, formData, {
         id: props.id,
         headers: { "Content-Type": "multipart/form-data" },

        //  name: editValue.name,
        //  phone: editValue.phone,
        //  email: editValue.email,
        //  adress: editValue.adress,
        //  pic: editValue.pic,
        //  id_cont_social: editValue.id_cont_social,
        //  id_contact_group: editValue.id_contact_group,
        //  id_work: editValue.id_work,
        
      });
      navigate("/");
   }
};

const handleDelete = ()=>{
   let isDelete = window.confirm(
       `¿Estás seguro de eliminar el registro de '${props.name}'?`
   )
   if(isDelete){
       Axios.delete(`http://localhost:3001/delete/${props.id}`)
       navigate("/")
   }
}

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
            Editar Contato
         </DialogTitle>
        <DialogContent>
        <div className='contact--modal'>
            <div className="container--avatar">
               <img className="avatar" src={URL} alt="User" />
            </div>
            <input 
                    type={"file"}
                    placeholder="avatar"
                    name="avatar"
                    onChange={onFileChange}
                    />
        </div>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="ID"
            defaultValue={props.id}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            defaultValue={props.name}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="phone"
            label="Telefone"
            defaultValue={props.phone}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            defaultValue={props.email}
            onChange={handleChangeValues}
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="adress"
            label="Endereço"
            defaultValue={props.adress}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          {/* <TextField
            margin="dense"
            id="pic"
            label="Imagem"
            defaultValue={props.pic}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          /> */}
          <TextField
            margin="dense"
            id="id_cont_social"
            defaultValue={props.id_cont_social}
            onChange={handleChangeValues}
            label="Redes"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="id_contact_group"
            label="Grupo"
            defaultValue={props.id_contact_group}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="id_work"
            label="Trabalho"
            defaultValue={props.id_work}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
            <ButtonIcon
               icone = "cancel"
               onClick={handleClose}
            /> 
            <ButtonIcon
               icone = "delete"
               onClick={()=>{
                  handleDelete()
               }}
            />
            <ButtonIcon
               icone = "save"
               onClick={() => {
                  handleSaveChange()
               }}
            />
        </DialogActions>
      </Dialog>
    </div>
  );
}
