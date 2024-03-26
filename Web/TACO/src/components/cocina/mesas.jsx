import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import MesaImg from "../../../public/assets/imgs/mesa.png"
import { CocinaNavBar } from "./navBar";
import { Orden } from "./orden";

import axios from 'axios';

export const MesasCocina=()=>{
  const urlMesas = 'http://localhost:8081/api/Proyecto_Integrador/mesa/obtener';
  const urlPedido = 'http://localhost:8081/api/Proyecto_Integrador/pedido/obtener';
  const [ mesas, setMesas ] = useState([]);
  const [ pedido, setPedido ] = useState('');
  const [ numero, setNumero ] = useState('');

  useEffect(() => {
    getMesas();
  }, []);

  const getMesas = async () => {
    const respuesta = await axios.get(urlMesas);
    setMesas(respuesta.data.data);
    console.log(respuesta.data.data);
  }

  const asignarPedido = async (mesa, x) => {
    const peticion = await axios.get(urlPedido);
    const respuesta = peticion.data.data;

    for (let i = 0; i < respuesta.length; i++) {
      const element = respuesta[i];
      
      if(element.mesaBean.id_mesas == mesa.id_mesas){
        setPedido(element);
        setNumero(x);
      }
    }
  }

  return (
      <>
        <CocinaNavBar selected={1}/>
        <div className="container-para-mesas-coc">
          <div className="container_mesas-coc">
            {mesas.map((mesa, i) => (
              <div key={mesa.id_mesas} className="mesa_container-adm">
                <p> Mesa {(i+1)} </p>
                <img src={MesaImg} alt="Mesa" />
                <div className="mesa_container_botones-coc">
                  <button className="orden-coc" onClick={() => {asignarPedido(mesa, i+1);} }>Orden</button>
                  <button className="entrega-coc">Entrega</button>
                </div>
              </div>
            ))}
          </div>

          <div className="container_pedido-coc">
            <Orden Pedido={pedido} numMesa={numero} />
          </div>
        </div>
      </>
    );
}