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
import {IconCamera} from "./photo/avatar"

export default function FormDialog(props) {
  // URL = `http://localhost:3001/${props.pic}`: URL = 'http://localhost:3001/user.png'
  props.pic ?  URL = `http://localhost:3001/${props.pic}` : URL = 'http://localhost:3001/user.png' 
  const [pathImage, setPathImage] = useState(URL);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();
  const [phones, setPhones] = useState([]);
  
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
        setFile(files);
        setFileName(files);
        // handleChangeValues(props);
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
   
   const formData = new FormData();
   formData.append('image', file);
   formData.append('id', props.id);
   formData.append('name', editValue.name);
  //  formData.append('phone', editValue.phone);
   formData.append('email', editValue.email);
   formData.append('adress', editValue.adress);
   formData.append('id_cont_social', editValue.id_cont_social);
   formData.append('id_contact_group', editValue.id_contact_group);
   formData.append('id_work', editValue.id_work);
   if(isSave) {
      Axios.post('http://localhost:3001/edit', formData, {
        headers: { "Content-Type": "multipart/form-data" }        
      }).then((res) => {
        console.log(res)
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
// setPhones(props.phone)
// console.log("telefonos ",props)
  return (
    <div>
      <Dialog 
        open={props.open} 
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
            Editar Contato
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
              onChange={handleChangeValues}
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
                margin="dense"
                id="name"
                label="Nome"
                defaultValue={props.name}
                onChange={handleChangeValues}
                type="text"
                fullWidth
                variant="standard"
              />
            </div>
            {/* <div>
              {(props.phone)?.map((phone, index) => (
                    <div key={phone} className="phone--input" >
                      <img className="photo-icon-form"
                            src="http://localhost:3001/telephone.png" 
                      />
                      <TextField 
                          margin="dense"
                          label={`Telefone ${index+1}`}
                          fullWidth
                          variant="standard"
                          id={`phone-${+1}`}
                          type={"text"}
                          placeholder={`Telefone ${index + 1}`}
                          name="phone"
                          defaultValue={phone[index]}
                          // onChange={(e) => handleChangePhone(e, index)}
                      />
                      <ButtonIcon
                          icon ="highlight_off"
                          // onClick = {(e) => handleRemovePhone(e, index)}
                      />
                    </div>

                ))}

            </div> */}
            <div className="textFile">
              <img className="photo-icon-form"
                  src="http://localhost:3001/telephone.png" 
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
            </div>
            <div className="textFile">
              <label>
                  <img className="photo-icon-form"
                        src="http://localhost:3001/mail.png" 
                  />
               </label>
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
            </div>
            <div className="textFile">
              <label>
                <img className="photo-icon-form"
                    src="http://localhost:3001/location.png" 
                />
              </label>
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
            </div>
            <div className="textFile">
                <label>
                  <img className="photo-icon-form"
                        src="http://localhost:3001/photo-camera.png" 
                  />
                </label>
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
            </div>
            <div className="textFile">
              <label>
                <img className="photo-icon-form"
                    src="http://localhost:3001/people.png" 
                />
              </label>
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
            </div>
            <div className="textFile">
              <label>
                <img className="photo-icon-form"
                    src="http://localhost:3001/suitcase.png" 
                />
              </label>
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
            </div>
          </form>
        </DialogContent>
        <DialogActions>
            <ButtonIcon
               icon = "cancel"
               onClick={handleClose}
            /> 
            <ButtonIcon
               icon = "delete"
               onClick={()=>{
                  handleDelete()
               }}
            />
            <ButtonIcon
               icon = "save"
               onClick={() => {
                  handleSaveChange()
               }}
            />
        </DialogActions>
      </Dialog>
    </div>
  );
}
