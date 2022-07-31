// /*export default function AddGroup(){
//     return(
//         <h1>AddGroup</h1>
//     )
// }*/
//import HomeGroup from "./components/HomeGroup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
import ButtonIcon, {ButtonIconF} from './buttoms';


export default function AddGroup() { 
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
        // navigate("/");
    };
   
    return(
        <div className="container--form">
            <ButtonIconF icon="arrow_forward_ios" onClick={() => { navigate("/homegroup") }} />
            <ButtonIcon icon="arrow_back_ios" onClick={() => { navigate("/") }} />
        <h1>AddGroup</h1>
        <form className="form--add" encType="multipart/form-data">
            {/* <label>Nome</label> */}
            <div className="container--avatar">
                    <img className="avatar" src={pathImage} alt="User" />
            </div>
                    <input 
                        type={"file"}
                        placeholder="avatar"
                        name="avatar"
                        onChange={onFileChange}
                    />
            <input
                type={"text"}
                placeholder="Nome"
                name="name"
                onChange={handleChange}
            />
            {/* <label>Telefone</label> */}
            <input
                type={"text"}
                placeholder="Descrição"
                name="descrisption"
                onChange={handleChange}
            />
            
            <ButtonIconF icon = "save" onClick={() => { handleClick() }} />
                
            {/* Salvar</button> */}
        </form>
        </div>
    )
}