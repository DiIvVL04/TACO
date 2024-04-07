import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import { CocinaNavBar } from "./navBar";
import { Orden } from "./orden";

import axios from 'axios'; 
import Swal from "sweetalert2";

export const MesasCocina=()=>{
  const urlMesas = 'http://localhost:8081/api/Proyecto_Integrador/mesa/obtener';
  const urlPedido = 'http://localhost:8081/api/Proyecto_Integrador/pedido/obtener';
  const urlPedidoActualiz='http://localhost:8081/api/Proyecto_Integrador/pedido/actualizar';
  const [ mesas, setMesas ] = useState([]);
  const [ idPedido, setIdPedido ] = useState(0);
  const [ numero, setNumero ] = useState('');
  const [ personal, setPersonal ] = useState([]);
  const [ mesa, setMesa ] = useState([]);
  const [ status, setStatus ] = useState(false);
  let token = localStorage.getItem("token");
  let rol = localStorage.getItem("rol");

  if(token == null || rol!='Cocina'){
    window.location = '/error';
  }
  
  const [count, setCount] = useState(0);

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
    setMesas(respuesta.data.data);
  }

  const asignarPedido = async (mesa, x) => {
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
      //console.log("ELEMENT"); 
      //console.log(element);
      
      if(element.mesaBean.id_mesas == mesa.id_mesas && element.statusP == false){
        //console.log(element);
        setIdPedido(element.idPedidos);
        setPersonal(element.personalBean);
        setMesa(element.mesaBean);
        setNumero(x);
        setStatus(false);
        break;
        
      } else if(element.statusP == true) {
        setIdPedido(0);
        setPersonal([]);
        setMesa([]);
        setNumero(x);
        setStatus(true);
      }
      
    }
    console.log("idpedido: "+idPedido)
  }

  const alertEntregarPedido=(mesa,x)=> {
    Swal.fire({
      title: "Entregar pedido",
      text: "Revise que la orden esté correcta antes de entregar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00FF51",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText:"Cancelar",
      confirmButtonText: "Entregar"
    }).then((result) => {
      if (result.isConfirmed) {        
        entregarPedido(mesa,x);
      }
    });
  }

  const entregarPedido = async (mesa,x) => {
    const peticion = await axios({
      method: 'GET',
      url: urlPedido,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const respuesta = peticion.data.data;

    for (let i = 0; i < respuesta.length; i++) {
      const element = respuesta[i];
      console.log(element);
      if(element.mesaBean.id_mesas == mesa.id_mesas && element.statusP == false){
        console.log("Pedido asignado a la mesa:", mesa.id_mesas, "ID de pedido:", element.idPedidos);
        setIdPedido(element.idPedidos);
        setPersonal(element.personalBean);
        setMesa(element.mesaBean);
        setNumero(x);
        setStatus(false);
        console.log("parametros antes de actualizar:")
        console.log(element)  
      
        const actualizar = await axios({
          method: 'PUT',
          url: urlPedidoActualiz,
          data:{
            'idPedidos': element.idPedidos,
            'personalBean': element.personalBean,
            'mesaBean': element.mesaBean,
            'status': true
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (actualizar.status === 200) {
          Swal.fire({
            title: "Pedido entregado",
            text: "Se ha entregado el pedido",
            icon: "success"
          });
          getMesas();
          againNull();
        } else {
          throw new Error("Error en la solicitud");
        }
        break;
        
      }
    }
    console.log("idpedido: "+idPedido)
  };

  const againNull = async () => {
    setIdPedido(0);
    setNumero(0);
    setMesa([]);
    setPersonal([]);
    setStatus(false);
  }
  
  
  return (
      <>
        <CocinaNavBar selected={1}/>
        <div className="container-para-mesas-coc">
          <div className="container_mesas-coc">
          {mesas.map((mesa, i) => (
              <div key={mesa.id_mesas} className="mesa_container-caja">
                <p> Mesa {(i+1)} </p>
                <img src={Mesa} alt="Mesa" />
                <div className="mesa_container_botones-caja">
                  <button className="orden-coc" onClick={() => {asignarPedido(mesa, mesa.id_mesas);} }>Orden</button>
                  <button className="entrega-coc" onClick={()=>{alertEntregarPedido(mesa, mesa.id_mesas)}}>Entrega</button>
                </div>
              </div>
            ))}
          </div>

          <div className="container_pedido-coc">
          <Orden idPedido={idPedido} numMesa={numero} mesa={mesa} personal={personal} status={status} />
          </div>
        </div>
      </>
    );
}