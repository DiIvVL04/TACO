import './css/adminNavBar.css'
import './css/adminBody.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import React,{ useEffect, useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../../public/assets/imgs/user.png'
import usuario from '../../../public/assets/imgs/usuario.png';
import mas from '../../../public/assets/imgs/anadir.png';
import { NavBarAdmin } from './navbar'
import borrar from "../../../public/assets/imgs/borrar.png";
import editar from "../../../public/assets/imgs/editar.png";
import Swal from 'sweetalert2';
Modal.setAppElement('#root');


const customStyles = {
    content: {
      width: '45%',
      minHeight: '80vh', // Establece una altura mínima del 80% del alto de la ventana
      maxHeight: '90vh', // Establece una altura máxima del 90% del alto de la ventana
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
  };
  
  

  const inputStyles = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '8px',
    marginBottom: '10px',
};


export const ConfiguracionAdmin=()=>{
    const urlPersonal = 'http://localhost:8081/api/Proyecto_Integrador/personal/';
    const [personal, setPersonal]= useState([])
    const [personalSelec, setPersonalSelec] = useState(false);
    const [ rol, setRol ] = useState('');
    const [ idPersonal, setIdPersonal ] = useState(0);
    const [ apellidoMat, setApellidoMat ] = useState('');
    const [ apellidoPat, setApellidoPat ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ prev, setPrev ] = useState(null);
    const [ emailStatus, setEmailStatus ] = useState(false);

    useEffect(() => {
        getPersonal();
    }, []);

    const getPersonal = async () => {
        const respuesta = await axios.get(urlPersonal+'obtener');
        setPersonal(respuesta.data.data);
        console.log(respuesta.data.data);
    }


    const alertCreateUser=(event,metodo)=>{
        event.preventDefault()
        Swal.fire({
            title: "Crear empleado",
            text: "Verifique que todos los datos estén correctos.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00FF51",
            cancelButtonColor: "#9B9B9B",
            cancelButtonText:"Cancelar",
            confirmButtonText: "Agregar"
          }).then((result) => {
            console.log(result)
            validar(metodo);
            
          });
    }

    const alertUpdateUser=(event,metodo)=>{
        event.preventDefault()
        Swal.fire({
            title: "Actualizar empleado",
            text: "Verifique que todos los datos estén correctos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FFE22C",
            cancelButtonColor: "#9B9B9B",
            cancelButtonText:"Cancelar",
            confirmButtonText: "Actualizar"
          }).then((result) => {
            if (result.isConfirmed) {
              validar(metodo);
            }
          });
    }

    const validar = (metodo) => {
        console.log("entra validar")
        let url = '';
        metodo == 'POST' ? url='guardar' : url='actualizar'

        console.log("IdUsuario: "+idPersonal);
        if (nombre == '' || nombre == undefined){
            Swal.fire("Nombre vacío","El campo de nombre se encuentra vacío","warning")
        } else if(apellidoPat == '' || apellidoPat == undefined){
            Swal.fire("Apellido paterno vacío","El campo de apellido paterno se encuentra vacío","warning")
        } else if(apellidoMat == '' || apellidoMat == undefined){
            Swal.fire("Apellido materno vacío","El campo de apellido materno se encuentra vacío","warning")
        } else if(rol == '' || rol == undefined){
            Swal.fire("Rol vacío","El campo de rol se encuentra vacío","warning")
        } else if(username == '' || username == undefined){
            Swal.fire("Nobre de usuario vacío","El campo de username se encuentra vacío","warning")
        } else if(password == '' || password == undefined){
            Swal.fire("Contraseña vacía","El campo de contraseña se encuentra vacío","warning")
        } else {
            let parametros = {
                idPersonal: idPersonal,
                nombre: nombre,
                apellido_pat: apellidoPat,
                apellido_mat: apellidoMat,
                email: email,
                rol: rol,
                username: username,
                password: password,
                }
        
                enviar(metodo, parametros, url);
        }
        
        console.log("sale validar")
    }


    const alertDeleteUser=()=> {
        Swal.fire({
          title: "Eliminar empleado",
          text: "Esta es una decisión irreversible",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#C20000",
          cancelButtonColor: "#9B9B9B",
          cancelButtonText:"Cancelar",
          confirmButtonText: "Eliminar"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Empleado eliminado",
              text: "Se ha eliminado al empleado",
              icon: "success"
            });
            deleteUser();
          }
        });
      }
    const deleteUser = async () => {

        let parametros = {
            idPersonal: idPersonal
        };
        enviar('DELETE', parametros, 'borrar');
    }

    const enviar = async (metodo, parametros, url) => {
        console.log("entra enviar")
        if(prev != null){
            let buttonPrev = document.getElementById(prev);
            buttonPrev.className = 'listaUser';
            setPrev(null);
        }        

        console.log("VALIDAR "+emailStatus)
        if(emailStatus){
            console.log("entra if")
            await axios({
                method: metodo,
                url: urlPersonal+url,
                data: parametros
                }).then(function (respuesta) {
                    if (respuesta.status==200 && metodo=='POST') {
                        Swal.fire({
                          title: "Empleado creado",
                          text: "Se ha añadido un nuevo empleado",
                          icon: "success"
                        });
                        closeModal();
                      } else if (respuesta.status==200 && metodo=='PUT'){
                        Swal.fire({
                            title: "Empleado actualizado",
                            text: "Se ha actualizado el empleado",
                            icon: "success"
                          });
                      }
                })
                .catch(function (error) {
                console.log(error);
                }).finally ( function () {
                    getPersonal();
                    limpiarCampos();
                });
        } else {
            Swal.fire(
                "Correo no valido",
                "Correo no es valido",
                "error"
            )
        }
        console.log("sale enviar")
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        limpiarCampos();
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const verEmpleado = (usuario, id) => {
        let button = document.getElementById(id);
        button.className = 'listaHover';
        
        if(prev != null && id!=prev){
            let buttonPrev = document.getElementById(prev);
            buttonPrev.className = 'listaUser';
        }
        setPrev(id);

        setPersonalSelec(true);
        setNombre(usuario.nombre);
        setIdPersonal(usuario.idPersonal);
        setRol(usuario.rol);
        setApellidoMat(usuario.apellido_mat);
        setApellidoPat(usuario.apellido_pat);
        setPassword(usuario.password);
        setUsername(usuario.username);
        setEmail(usuario.email);
        validarPrevEmail(usuario.email);
    };

    const limpiarCampos = () => {
        setPersonalSelec(false);
        setIdPersonal(null);
        setRol('');
        setApellidoMat('');
        setApellidoPat('');
        setPassword('');
        setUsername('');
        setEmail('');
        setNombre('');
    };

    const validarEmail = (e) => {
        let campo = e;
            
        let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if (emailRegex.test(campo.value)) {  
            console.log("SI")
          setEmailStatus(true);
        } else {
            console.log("NO")
          setEmailStatus(false);
        }
    }

    const validarPrevEmail = (correo) => {
        let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(emailRegex.test(correo)) {
          setEmailStatus(true);
        }else {
          setEmailStatus(false);
        }
      }

    return(
        <>
            <NavBarAdmin selected={3}/>
            <div className='container-general-config'>
                <div className="container-user-adm">
                    <div className="container_imagen-adm">
                        <img src={User} alt="User" />
                        <button className="agregar-adm" onClick={openModal}><img src={mas} style={{width: '50%', height: 'auto'}} /></button>
                    </div>
                    <div className="container_formulario-adm">
                        <div>
                        <div className='input-form-2'>
                            <div>
                                <label className="label-adm">Nombre:</label>
                                <input id="nombre-adm" name="nombre" value={nombre} onChange={(e) => {setNombre(e.target.value)}} placeholder="Nombre" required disabled={!personalSelec}/>
                            </div>
                            <div style={{marginLeft: '15px'}}>
                                <label className="label-adm">Apellido paterno:</label>
                                <input id="paterno-adm" name="paterno" value={apellidoPat} onChange={(e) => {setApellidoPat(e.target.value)}} placeholder="Apellido paterno" required disabled={!personalSelec}/>
                            </div>
                        </div>
                        
                        <div className='input-form-2'>
                            <div>
                                <label className="label-adm">Apellido materno:</label>
                                <input id="materno-adm" name="materno" value={apellidoMat} onChange={(e) => {setApellidoMat(e.target.value)}} placeholder="Apellido materno" required disabled={!personalSelec}/>
                            </div>
                            <div style={{marginLeft: '15px'}}>
                                <label className="label-adm">Usuario:</label>
                                <input id="usuario-adm" name="usuario" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Usuario" required disabled={!personalSelec}/>
                            </div>
                        </div>

                        <div className='input-form-2'>
                            <div>
                                <label className="label-adm">Correo electrónico:</label>
                                <input id="email-adm" name="email" value={email}  onInput={
                                (e) => { validarEmail(e.target); }
                                } placeholder="Correo electrónico" onChange={(e) => {setEmail(e.target.value)}} type="email" required disabled={!personalSelec}/>
                            </div>
                            <div style={{marginLeft: '15px'}}>
                                <label className="label-adm">Contraseña:</label>
                                <input id="password-adm" name="password" value={password} placeholder="Contraseña" onChange={(e) => {setPassword(e.target.value)}} type="text" required disabled={!personalSelec}/>
                            </div>
                        </div>

                        {rol=="Admin" ? (<></>): (
                        <div>
                        <span className='label-adm'>Rol: 
                        
                        <select id='rol-adm' style={{width:"100%", height:'50px'}} onChange={(e) => setRol(e.target.value)} required disabled={!personalSelec}>
                            {rol=="Mesero" ? (<option value="Mesero" selected>Mesero</option>) : (<option value="Mesero">Mesero</option>)}
                            {rol=="Caja" ? (<option value="Caja" selected>Cajero</option>) : (<option value="Caja">Cajero</option>)}
                            {rol=="Cocina" ? (<option value="Cocina" selected>Cocinero</option>) : (<option value="Cocina">Cocinero</option>)}                               
                            
                        </select></span> 
                        </div>
                        )}
                        

                        <div className='input-form-2'>
                            <button type="submit" className="boton-adm" onClick={(e) => alertUpdateUser(e,'PUT')}>Actualizar</button>
                            {rol=="Admin" ? (<></>): (<button className='boton-adm' onClick={() => alertDeleteUser()}>Eliminar</button> )}
                        </div> 

                        
                        </div>
                        
                    </div>
                </div>
                <div className='container-users'>
                    {personal.map((personal, i) => (
                    <div className='listaUser' key={i} id={i} onClick={()=>verEmpleado(personal, i) } >                        
                        <span className="info-user-list"> 
                            {personal.nombre} {personal.apellido_pat} <b>{personal.rol}</b>
                            <img src={usuario} style={{width: '7%', height: 'auto'}} /> 
                        </span>
                    </div>
                    ))}   
                </div>
            </div>
            
            <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={{
        ...customStyles,
        content: {
            ...customStyles.content,
            height: '80vh', // Ajusta la altura del modal
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centra verticalmente los elementos
            alignItems: 'center', // Centra horizontalmente los elementos
            padding: '20px', // Agrega un relleno para suavizar los bordes
            border: 'none', // Elimina el borde para evitar bordes irregulares
        },
    }}
    contentLabel="Nuevo empleado Modal"
>
    <h2 style={{ color: 'black', fontSize: 35, marginBottom: '40px', textAlign: 'center' }}>Agregar Empleado</h2>
    <form onSubmit={(e) => alertCreateUser(e, 'POST')} style={{ width: '90%', maxWidth: '400px' }}>
        <span className='inputs-modal'>Nombre: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} /></span>
        <span className='inputs-modal'>Apellido Paterno: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Apellido Paterno' onChange={(e) => setApellidoPat(e.target.value)} /></span>
        <span className='inputs-modal'>Apellido Materno: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Apellido Materno' onChange={(e) => setApellidoMat(e.target.value)} /></span>
        <span className='inputs-modal'>Rol:
            <select style={{ ...inputStyles, width: "100%", maxWidth: '100%' }} value={rol} onChange={(e) => setRol(e.target.value)} required>
                <option disabled value="">Seleccionar Rol</option>
                <option value="Mesero">Mesero</option>
                <option value="Caja">Cajero</option>
                <option value="Cocinero">Cocinero</option>
            </select>
        </span>
        <span className='inputs-modal'>Username: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} /></span>
        <span className='inputs-modal'>Correo electrónico: 
        <input style={{ ...inputStyles, width: "100%" }} required type='email' onInput={
                                (e) => { validarEmail(e.target); }
                                } placeholder='Correo electrónico' onChange={(e) => setEmail(e.target.value)} />
        </span>
        <span className='inputs-modal'>Contraseña: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} /></span>
        <div className='container-botones-modal' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className='boton-aceptar'>Agregar Empleado</button>
            <button className='boton-cancelar' onClick={closeModal}>Cancelar</button>
        </div>
    </form>
</Modal>

    </>
    )
}