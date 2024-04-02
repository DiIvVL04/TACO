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

  useEffect(() => {
    getMesas();
  }, []);

  const getMesas = async () => {
    const respuesta = await axios.get(urlMesas+'obtener');
    setMesas(respuesta.data.data);
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

  const alertEliminarMesa=(id)=> {
    Swal.fire({
      title: "Eliminar mesa",
      text: "¿Está seguro de eliminar esta mesa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C20000",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText:"Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Mesa eliminada",
          text: "Se ha eliminado la mesa",
          icon: "success"
        });
        eliminarMesa(id)
      }
    });
  }
  const eliminarMesa = async (id) => {

    await axios({
      method: 'DELETE',
      url: urlMesas+'borrar',
      data: {
        id_mesas: id
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

      return(
        <>
          <NavBarAdmin selected={1}/>
          <div className="container-para-mesas-adm">
            <div className="container_mesas-adm">
            {mesas.map((mesa, i) => (
              <div key={mesa.id_mesas} className="mesa_container-adm">
                <p> Mesa {(i+1)} </p>
                <img src={MesaImg} alt="Mesa" />
                <div className="mesa_container_botones-adm">
                <button className="administrar-adm" onClick={() => alertEliminarMesa(mesa.id_mesas)}>Eliminar</button>
                </div>
              </div>
            ))}
                
            <div className="mesa_container-adm" id="agregarMesa" onClick={() => alertAgregarMesa()}>
              <img src={Sumar} alt="Sumar" />
              <p> Agregar mesa</p>
            </div>  

            </div>
            
          </div>
        </>
      )
}