import React, { useEffect, useState } from "react";
import User from "../../../public/assets/imgs/user.png"
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import { CocinaNavBar } from "./navBar";
import Swal from 'sweetalert2';

import axios from 'axios';

export const ConfiguracionCocina=()=>{
  const urlPersonal = 'http://localhost:8081/api/Proyecto_Integrador/personal/';
  const urlContra = 'http://localhost:8081/api/Proyecto_Integrador/personal/recuperarContra';
  const [ apellidoMat, setApellidoMat ] = useState('');
  const [ apellidoPat, setApellidoPat ] = useState('');
  const [ correo, setCorreo ] = useState('');
  const [ idPersona, setIdPersona ] = useState(0);
  const [ nombre, setNombre ] = useState('');
  const [ _rol, setRol ] = useState('');
  const [ usuario, setUsuario ] = useState('');
  const [ contra, setContra ] = useState('');
  const [ contra2, setContra2 ] = useState('');

  let token = localStorage.getItem("token");
  let rol = localStorage.getItem("rol");
  let user = localStorage.getItem("usuario");

  if(token == null || rol!='Cocina'){
      window.location = '/error';
  }

  useEffect(() => {
    getPersonal();
  }, []);

  const getPersonal = async () => {
    const respuesta = await axios({
        method: 'GET',
        url: urlPersonal+'obtener',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    setUser(respuesta.data.data);
  }

  const setUser = async (personal) => {
    for (let i = 0; i < personal.length; i++) {
      const element = personal[i];

      if(element.idPersonal == user){
        setApellidoMat(element.apellido_mat);
        setApellidoPat(element.apellido_pat);
        setCorreo(element.email);
        setIdPersona(element.idPersonal);
        setNombre(element.nombre);
        setRol(element.rol);
        setUsuario(element.username);
      }
    }
  }

  const validar = async () => {
    event.preventDefault();
    let parametros;

    if(correo.trim() == '' || correo == undefined) {
      Swal.fire("Correo vacío","El campo de correo se encuentra vacío","warning")
  } else if(contra.trim() == '' || contra == undefined){
      Swal.fire("Contraseña vacía","El campo de contraseña se encuentra vacío","warning")
  } else if(contra != contra2 || contra2 == undefined){ 
      Swal.fire("Repetir Contraseña vacío","El campo de repetir contraseña se encuentra vacío","warning")
  } else {
      parametros = {
        apellido_mat: apellidoMat,
        apellido_pat: apellidoPat,
        email: correo,
        idPersonal: idPersona,
        nombre: nombre,
        password: contra,
        rol: _rol,
        token: null,
        username: usuario
      }
    }

    updatePersona(parametros);
  }

  const updatePersona = async (parametros) => {
    event.preventDefault();

    console.log("ENVIAR");
    console.log(parametros);
    await axios({
      method: 'PUT',
      url: urlPersonal+'recuperarContra',
      data: parametros,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: parametros
    }).then(function (res) {
      console.log(res);
      if(res.data.data == 'OK'){
        console.log(res.data.data); 
        Swal.fire("Datos Actualizados","Acción Realizada Correctamente","success")
        setContra('');
        setContra2('');   
      }
    }).catch(function (error) {
      console.log(error);
    }).finally(function () {
      setContra('');
      setContra2('');
    })
  }

    return (
        <>
        <CocinaNavBar selected={3}/>
        <div className="container-user-coc">
          <div className="container_imagen-coc">
            <img src={User} alt="User" />
          </div>
          <div className="container_formulario-coc">
            <form>
              <div>
                <label className="label-coc">Usuario:</label>
                <input id="usuario-coc" name="usuario" disabled value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Usuario" />
              </div>
              <div>
                <label className="label-coc">Correo Electrónico:</label>
                <input id="email-coc" name="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo electrónico" type="email" />
              </div>
              <div>
                <label className="label-coc">Nueva Contraseña:</label>
                <input id="password-coc" name="password"  value={contra} onChange={(e) => setContra(e.target.value)} placeholder="Nueva Contraseña" type="password" />
              </div>
              <div>
                <label className="label-coc">Repetir Contraseña:</label>
                <input id="password-coc" name="password"value={contra2}  onChange={(e) => setContra2(e.target.value)} placeholder="Repetir Contraseña" type="password" />
              </div>
              <button type="submit" className="boton-coc" onClick={() => validar()}>Guardar</button>
            </form>
          </div>
        </div>
          
        </>
    )
}