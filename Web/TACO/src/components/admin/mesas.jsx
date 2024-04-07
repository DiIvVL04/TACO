import { useEffect, useState } from 'react';
import './css/adminNavBar.css'
import './css/adminBody.css'
import MesaImg from "../../../public/assets/imgs/mesa.png"
import Sumar from "../../../public/assets/imgs/sumar.png"
import React from 'react';
import { NavBarAdmin } from './navbar';

import axios from 'axios';
import Swal from 'sweetalert2';

export const MesasAdmin=()=>{
  const urlMesas = 'http://localhost:8081/api/Proyecto_Integrador/mesa/';
  const [ mesas, setMesas ] = useState([]);
  const [ mesas2, setMesas2 ] = useState([]);
  let token = localStorage.getItem("token");
  let rol = localStorage.getItem("rol");

  if(token == null || rol!='Admin'){
    window.location = '/error';
  }

  useEffect(() => {
    getMesas();
  }, []);

  const getMesas = async () => {
    const respuesta = await axios({
      method: 'GET',
      url: urlMesas+'obtener',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    let mesasAll = [], mesasAll2 = [];

    for (let i = 0; i < respuesta.data.data.length; i++) {
      const element = respuesta.data.data[i];
      
      console.log(element);
      if(element.estado){
        mesasAll.push(element);        
      } else {
        mesasAll2.push(element);
      }
    }

    
    setMesas(mesasAll);
    setMesas2(mesasAll2);
  }

  const alertAgregarMesa=()=> {
    Swal.fire({
      title: "Agregar mesa",
      text: "¿Está seguro de agregar una nueva mesa?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00FF51",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText:"Cancelar",
      confirmButtonText: "Agregar"
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: "Mesa agregada",
          text: "Se ha añadido una nueva mesa",
          icon: "success"
        });
        agregarMesa()
      }
    });
  }
  const agregarMesa = async () => {
    let number = mesas.length + 1;
    await axios({
      method: 'POST',
      url: urlMesas+'guardar',
      data: {
        numero: number,
        estado: true
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(function (respuesta) {
      console.log(respuesta);
      console.log(respuesta.status);
      //Aquí por si quieren poner alertas de si se hizo o no
    })
    .catch(function (error) {
      console.log(error);
    });

    getMesas();
  }

  const alertEliminarMesa=(id, numMesa)=> {
    Swal.fire({
      title: "Desactivar mesa",
      text: "¿Está seguro de desactivar esta mesa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C20000",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText:"Cancelar",
      confirmButtonText: "Desactivar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Mesa Desactivada",
          text: "Se ha desactivado la mesa",
          icon: "success"
        });
        eliminarMesa(id, numMesa)
      }
    });
  }

  const alertActivarMesa=(id, numMesa)=> {
    Swal.fire({
      title: "Activar mesa",
      text: "¿Está seguro de activar esta mesa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00ac00",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText:"Cancelar",
      confirmButtonText: "Activar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Mesa Activada",
          text: "Se ha activado la mesa",
          icon: "success"
        });
        activarMesa(id, numMesa)
      }
    });
  }

  const eliminarMesa = async (id, numMesa) => {
    console.log(numMesa);
    await axios({
      method: 'PUT',
      url: urlMesas+'actualizar',
      data: {
        id_mesas: id,
        numero: numMesa,
        estado: false
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(function (respuesta) {
      console.log(respuesta);
      console.log(respuesta.status);
      //Aquí por si quieren poner alertas de si se hizo o no
    })
    .catch(function (error) {
      show_alerta('Error en la Solicitud', 'error');
      console.log(error);
    });

    getMesas();
  }

  const activarMesa = async (id, numMesa) => {
    console.log(numMesa);
    await axios({
      method: 'PUT',
      url: urlMesas+'actualizar',
      data: {
        id_mesas: id,
        numero: numMesa,
        estado: true
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(function (respuesta) {
      console.log(respuesta);
      console.log(respuesta.status);
    })
    .catch(function (error) {
      show_alerta('Error en la Solicitud', 'error');
      console.log(error);
    });

    getMesas();
  }


      return(
        <>
          <NavBarAdmin selected={1}/>
          <div className="container-para-mesas-adm">
            <div className="container_mesas-adm">
              {mesas.map((mesa, i) => (
                <div key={mesa.id_mesas} className="mesa_container-adm">
                  <p> Mesa {mesa.id_mesas} </p>
                  <img src={MesaImg} alt="Mesa" />
                  <div className="mesa_container_botones-adm">
                  <button className="administrar-adm" onClick={() => alertEliminarMesa(mesa.id_mesas, mesa.numero)}>Desactivar</button>
                  </div>
                </div>
              ))}
                  
              <div className="mesa_container-adm" id="agregarMesa" onClick={() => alertAgregarMesa()}>
                <img src={Sumar} alt="Sumar" />
                <p> Agregar mesa</p>
              </div>  
            </div>

            <div className="container_mesas-adm">
            {mesas2.map((mesa, i) => (
              <div key={mesa.id_mesas} className="mesa_container-adm">
                <p> Mesa {mesa.id_mesas} </p>
                <img src={MesaImg} alt="Mesa" />
                <div className="mesa_container_botones-adm">
                <button className="administrar-adm2" onClick={() => alertActivarMesa(mesa.id_mesas, mesa.numero)}>Activar</button>
                </div>
              </div>
            ))}
            </div>
            
          </div>
        </>
      )
}