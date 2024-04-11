import React, { useEffect, useState } from "react";
import './css/cajaNavBar.css';
import './css/cajaBody.css';
import Mesa from "../../../public/assets/imgs/mesa.png"
import { NavBarCaja } from "./navbar";

import axios from 'axios';
import { Orden } from "./orden.jsx";

export const MesasCaja=()=>{
  const urlMesas = 'http://localhost:8081/api/Proyecto_Integrador/caja/obtener';
  const urlPedido = 'http://localhost:8081/api/Proyecto_Integrador/pedido/obtener';
  const [ mesas, setMesas ] = useState([]);
  const [ idPedido, setIdPedido ] = useState(0);
  const [ numero, setNumero ] = useState('');
  const [ personal, setPersonal ] = useState([]);
  const [ mesa, setMesa ] = useState([]);
  const [ status, setStatus ] = useState(false);  
  const [ count, setCount ] = useState(0);
  const [ i, setI ] = useState(0);
  let token = localStorage.getItem("token");
  let rol = localStorage.getItem("rol");

  if(token == null || rol!='Caja'){
    window.location = '/error';
  } 

  useEffect(() => {
    getMesas();
  }, []);

  const getMesas = async () => {
    const respuesta = await axios({
      method: 'GET',
      url: urlMesas,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    let mesaArray = [];
    for (let i = 0; i < respuesta.data.data.length; i++) {
      const element = respuesta.data.data[i];
      //console.log("id de mesa")
      //console.log(element.pedidoBean.mesaBean.id_mesas)
      if(element.status_de_Pago == false){
        mesaArray.push(element);
      }
    }

    setMesas(mesaArray);
  }

  const cobrarPedido = async (mesa) => {
    const peticion = await axios({
      method: 'GET',
      url: urlPedido,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const respuesta = peticion.data.data;
  
    for (let i = 0; i <= respuesta.length; i++) {
      const element = respuesta[i];
      
      if (element.mesaBean.id_mesas === mesa.pedidoBean.mesaBean.id_mesas && element.statusP === false) {
        console.log(`elemento`)
        console.log(element.mesaBean.id_mesas)
        console.log("id mesa")
        console.log(mesa.pedidoBean.mesaBean.id_mesas)
        setIdPedido(element.idPedidos);
        setPersonal(element.personalBean);
        setMesa(mesa);
        setNumero(mesa.pedidoBean.mesaBean.numero);
        setStatus(false);
        break;
        
      } else if (element.statusP === true) {
        setIdPedido(0);
        setPersonal([]);
        setMesa([]);
        setNumero(mesa.pedidoBean.mesaBean.numero);
        setStatus(true);
      }
    }
  }
  

  return (
    <>
      <NavBarCaja selected={1} />
      <div className="container-para-mesas-caja">
        <div className="container_mesas-caja">
          {mesas.map((mesa) => (
            <div key={mesa.pedidoBean.mesaBean.id_mesas} className="mesa_container-caja">
              <p> Mesa {mesa.pedidoBean.mesaBean.id_mesas} </p>
              <img src={Mesa} alt="Mesa" />
              <div className="mesa_container_botones-caja">
                <button className="cobrar-caja" onClick={() => cobrarPedido(mesa)}>Cobrar</button>
              </div>
            </div>
          ))}
        </div>

        <div className="container_pedido-caja">
          <Orden idPedido={idPedido} numMesa={numero} mesa={mesa} personal={personal} status={status} />
        </div>
      </div>
    </>
  )
}