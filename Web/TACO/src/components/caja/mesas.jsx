import React, { useEffect, useState } from "react";
import './css/cajaNavBar.css';
import './css/cajaBody.css';
import MesaImg from "../../../public/assets/imgs/mesa.png"
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

  /*useEffect(() => {
    setTimeout(async () => {
      setCount(count + 1);

      const respuesta = await axios.get(urlMesas);
      if(respuesta.data.data != mesas){
        setMesas(respuesta.data.data);
      }

    }, 5000);
  });*/

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
      if(element.status_de_Pago == false){
        mesaArray.push(element);
      }
    }

    setMesas(mesaArray);
  }

  const cobrarPedido = async (mesa, x) => {
    const peticion = await axios({
      method: 'GET',
      url: urlPedido,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const respuesta = peticion.data.data;
    //console.log("Peticion");
    //console.log(peticion.data.data);

    for (let i = 0; i < respuesta.length; i++) {
      const element = respuesta[i];
      
      if(element.mesaBean.id_mesas == mesa.pedidoBean.idPedidos && element.statusP == true){
        //console.log(element);
        setIdPedido(element.idPedidos);
        setPersonal(element.personalBean);
        setMesa(mesa);
        setNumero(element.mesaBean.id_mesas);
        setStatus(false);
        break;
        
      } else if(element.statusP == false) {
        setIdPedido(0);
        setPersonal([]);
        setMesa([]);
        setNumero(x);
        setStatus(true);
      }
    }
  }

    return (  
        <>
          <NavBarCaja selected={1} />
          <div className="container-para-mesas-caja">
            <div className="container_mesas-caja">
            {mesas.map((mesa, i) => (
              <div key={mesa.id_mesas} className="mesa_container-caja">
                <p> Mesa {(i+1)} </p>
                <img src={MesaImg} alt="Mesa" />
                <div className="mesa_container_botones-caja">
                <button className="cobrar-caja"  onClick={() => {cobrarPedido(mesa, mesa.id_mesas);} }>Cobrar</button>
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