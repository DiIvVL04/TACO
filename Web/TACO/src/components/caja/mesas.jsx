import React, { useEffect, useState } from "react";
import './css/cajaNavBar.css'
import './css/cajaBody.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import { NavBarCaja } from "./navbar";
import axios from 'axios';
export const MesasCaja=()=>{
  const urlMesas = 'http://localhost:8081/api/Proyecto_Integrador/mesa/obtener';
  const [ mesas, setMesas ] = useState([]);
  useEffect(() => {
    getMesas();
  }, []);

  const getMesas = async () => {
    const respuesta = await axios.get(urlMesas);
    setMesas(respuesta.data.data);
  }
    return (
        <>
          <NavBarCaja/>
          <div className="container-para-mesas-caja">
            <div className="container_mesas-caja">
              {mesas.map((mesa, i) => (
              <div key={mesa.id_mesas} className="mesa_container-caja">
                <p> Mesa {(i+1)} </p>
                <img src={Mesa} alt="Mesa" />
                <div className="mesa_container_botones-caja">
                <button className="cobrar-caja">Cobrar</button>
                </div>
              </div>
            ))}
              
            </div>
            <div className="container_pedido-caja"></div>
          </div>
        </>
    )
}