import { useEffect, useState } from 'react';
import './css/adminNavBar.css'
import './css/adminBody.css'
import MesaImg from "../../../public/assets/imgs/mesa.png"
import Sumar from "../../../public/assets/imgs/sumar.png"
import React from 'react';
import { NavBarAdmin } from './navbar';

import axios from 'axios';

export const MesasAdmin=()=>{
  const urlMesas = 'http://localhost:8081/api/Proyecto_Integrador/mesa/obtener';
  const urlMesasAgg = 'http://localhost:8081/api/Proyecto_Integrador/mesa/guardar';
  const [ mesas, setMesas ] = useState([]);

  useEffect(() => {
    getMesas();
  }, []);

  const getMesas = async () => {
    const respuesta = await axios.get(urlMesas);
    setMesas(respuesta.data.data);
  }

  const agregarMesa = async () => {
    let number = mesas.length + 1;
    await axios({
      method: 'POST',
      url: urlMesasAgg,
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
                <button className="administrar-adm">Administrar</button>
                </div>
              </div>
            ))}
                
            <div className="mesa_container-adm" id="agregarMesa" onClick={() => agregarMesa()}>
              <img src={Sumar} alt="Sumar" />
              <p> Agregar mesa</p>
            </div>  

            </div>
            <div className="container_pedido-adm">

            </div>
          </div>
        </>
      )
}