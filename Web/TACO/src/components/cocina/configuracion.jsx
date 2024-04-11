import React, { useEffect, useState } from "react";
import User from "../../../public/assets/imgs/user.png"
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import { CocinaNavBar } from "./navBar";

import axios from 'axios';

export const ConfiguracionCocina=()=>{
  const urlPersonal = 'http://localhost:8081/api/Proyecto_Integrador/personal/';
  const [ apellidoMat, setApellidoMat ] = useState('');
  const [ apellidoPat, setApellidoPat ] = useState('');
  const [ correo, setCorreo ] = useState('');
  const [ idPersona, setIdPersona ] = useState(0);
  const [ nombre, setNombre ] = useState('');
  const [ _rol, setRol ] = useState('');
  const [ usuario, setUsuario ] = useState('');
  const [ contra, setContra ] = useState('');

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
        setContra(element.password);
        setRol(element.rol);
        setUsuario(element.username);
      }
    }
  }

  const validar = async () => {
    event.preventDefault();
    let parametros;

    if(correo.trim() === '') {
      //alerta de que está vacio el correo
    } else if(contra.trim() === ''){
      //alerta de que está vacio la contra
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

    await axios({
      method: 'PUT',
      url: urlPersonal+'actualizar',
      data: parametros,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(function (res) {
      if(res.data.status == 'OK'){
      }
    }).catch(function (error) {
      console.log('');
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
                <label className="label-coc">Correo electrónico:</label>
                <input id="email-coc" name="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo electrónico" type="email" />
              </div>
              <div>
                <label className="label-coc">Contraseña:</label>
                <input id="password-coc" name="password" value={contra} onChange={(e) => setContra(e.target.value)} placeholder="Contraseña" type="password" />
              </div>
              <button type="submit" className="boton-coc" onClick={() => validar()}>Guardar</button>
            </form>
          </div>
        </div>
          
        </>
    )
}