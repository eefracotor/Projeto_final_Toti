import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ButtonIcon from "./buttoms";
import Contacto from "./contact";
import "bootstrap/dist/css/bootstrap.min.css";
import { PropaneSharp } from "@mui/icons-material";



export default function Home() { 
    const [contato, setContact] = useState([]);
    const URL = "http://localhost:3001/list";
    const [formContacts, setFormContacts] = useState([]); 
    const [pesquisar, setPesquisar] = useState("");

    const getContact = async()=>{
      await Axios.get(URL)
      .then(response=>{
        setContact(response.data);
        setFormContacts(response.data);
      }).catch(error=>{
        console.log(error);
      })  
    }
    
    
    const handleChange=e=>{
       setPesquisar(e.target.value);
       filtrar(e.target.value); 
    }


    const filtrar=(terminaPesquisa)=>{
      var resultadosBusca = formContacts.filter((elemento)=>{
        if(elemento.name.toString().toLowerCase().includes(terminaPesquisa.toLowerCase())
        // || elemento.phone.toString().toLowerCase().includes(terminaPesquisa.toLowerCase())    
        ){
          return elemento;  
        }
      });  
      setContact(resultadosBusca);
    } 


    useEffect(()=>{
    getContact();    
    },[])

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
            <h1> Lista de Conatos</h1>
            <div className="bar-principal">
                <div className="containerInput">
                    {/*<form onSubmit = {SearchContact}>*/}
                        {/*<h4>Pesquise o nome de um contato</h4>*/}
                        <input
                            className="form-control inputPesquisar"
                            type={"text"}
                            placeholder = "Pesquise um contato..."
                            //name = "name"
                            value={pesquisar}
                            onChange = {handleChange}
                        />
                        {/* <ButtonIcon icon="search" /> */}
                            {/*<FontAwesomeIcon icon={faSearch} />*/}
                                    
                    {/*</form>*/}
                </div>
                <div className="button-add">
                <ButtonIcon
                    icon="person_add"
                    onClick={() => {
                        navigate("/addcontact")
                    }}
                />
                <ButtonIcon
                    icon="group_add"
                    // onClick={() => {
                    //     navigate("/addcontact")
                    // }}
                />
                </div>
            </div>

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
                                pic={contact.pic}
                            ></Contacto>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

