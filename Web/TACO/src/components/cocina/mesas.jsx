import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import { CocinaNavBar } from "./navBar";
import { Orden } from "./orden";

import axios from 'axios';
import Swal from "sweetalert2";

export const MesasCocina = () => {
  const urlMesas = 'http://localhost:8081/api/Proyecto_Integrador/mesa/obtener';
  const urlPedido = 'http://localhost:8081/api/Proyecto_Integrador/pedido/obtener';
  const urlOrdenActualiz = 'http://localhost:8081/api/Proyecto_Integrador/orden/actualizar';
  const urlPedidoOrden= "http://localhost:8081/api/Proyecto_Integrador/orden/pedidos";
  const [mesas, setMesas] = useState([]);
  const [idPedido, setIdPedido] = useState(0);
  const [numero, setNumero] = useState('');
  const [personal, setPersonal] = useState([]);
  const [mesa, setMesa] = useState([]);
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let token = localStorage.getItem("token");
  let rol = localStorage.getItem("rol");

  if (token == null || rol != 'Cocina') {
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
    }).then(function (res) {
      let mesasAll = [];

      for (let i = 0; i < res.data.data.length; i++) {
        const element = res.data.data[i];
        if (element.estado) {
          mesasAll.push(element);
        }
      }

      setMesas(mesasAll);
    });
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
      let pedidoEncontrado = false;
    
      for (let i = 0; i < respuesta.length; i++) {
        const element = respuesta[i];
        if (element.mesaBean.id_mesas === mesa.id_mesas && element.statusP === false) {
          setIdPedido(element.idPedidos);
          setPersonal(element.personalBean);
          setMesa(element.mesaBean);
          setNumero(x);
          setStatus(false);
          pedidoEncontrado = true;
          break;
        }
      }
    
      if (!pedidoEncontrado) {
        setIdPedido(0);
        setPersonal([]);
        setMesa([]);
        setNumero(x);
        setStatus(false);
      }
    }
    

  const alertEntregarPedido = (mesa, x) => {
    Swal.fire({
      title: "Entregar pedido",
      text: "Revise que la orden esté correcta antes de entregar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00FF51",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Entregar"
    }).then((result) => {
        if (result.isConfirmed) {
          entregarPedido(mesa, x);
          Swal.fire({
            title:"Pedido entregado",
            text:"El pedido ha sido enviado al mesero",
            icon:"success"}).then((result)=>{
                 window.location.reload()
            });
        }
    });
  }

  const entregarPedido = async (mesa, x) => {
    try {
      const peticion = await axios({
        method: 'GET',
        url: urlPedido,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const respuesta = peticion.data.data;
      console.log("respuesta")
      console.log(respuesta)
      for (let i = 0; i < respuesta.length; i++) {
        const element = respuesta[i];
        if (element.mesaBean.id_mesas == mesa.id_mesas && element.statusP == false) {
          console.log("Pedido asignado a la mesa:", mesa.id_mesas, "ID de pedido:", element.idPedidos);
  
          const ordenesRespuesta = await axios({
            method: 'POST',
            url: urlPedidoOrden,
            data: {
              "pedidoBean": {
                "idPedidos": element.idPedidos
              }
            },
            headers: {
              Authorization: `Bearer ${token}`
            } 
          });
          const ordenesActualizar = ordenesRespuesta.data.data;
          console.log(ordenesActualizar)
          for (let j = 0; j < ordenesActualizar.length; j++) {
            const orden = ordenesActualizar[j];
            console.log(orden.idOrdenes)
            console.log(orden.status)
            console.log(orden.pedidoBean)
            console.log(orden.platilloBean)
            console.log("Orden ID:", orden.idOrdenes);
            const actualizarOrden = await axios({
              method: 'PUT',
              url: urlOrdenActualiz,
              data: {
                'idOrdenes': orden.idOrdenes,
                'status': true,
                'pedidoBean':orden.pedidoBean,
                'platilloBean':orden.platilloBean
              },
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (actualizarOrden.status !== 200) {
              throw new Error("Error en la solicitud de actualizar la orden");
            }
          }
        }
      }
      console.log("idpedido: " + idPedido)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Error 401: No autorizado. Verifica tu token.');
      } else {
        console.error(error);
      }
    }
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
      <CocinaNavBar selected={1} />
      <div className="container-para-mesas-coc">
        <div className="container_mesas-coc">
          {mesas.map((mesa, i) => (
            <div key={mesa.id_mesas} className="mesa_container-cocina">
              <p> Mesa {mesa.numero} </p>
              <img src={Mesa} alt="Mesa" />
              <div className="mesa_container_botones-caja">
                <button className="orden-coc" onClick={() => { asignarPedido(mesa, mesa.id_mesas); }}>Orden</button>
                <button className="entrega-coc" onClick={() => { alertEntregarPedido(mesa, mesa.id_mesas) }}>Entrega</button>
              </div>
            </div>
          ))}
        </div>
        <div className="container_pedido-coc">
          {isLoading ? (
            <div>Cargando...</div>
          ) : (
            idPedido !== 0 && (
              <div className="orden-card">
                <h3>Orden #{idPedido}</h3>
                <div className="info-container">
                  <p>Mesa: {numero}</p>
                  <p>Estado: {status ? "Entregado" : "Pendiente"}</p>
                </div>
                <div className="info-container">
                  <p>Mesero: {personal.nombre} {personal.apellido}</p>
                </div>
                <hr />
                <Orden idPedido={idPedido} status={status} />
              </div>
            )
          )}
        </div>
      </div>
      <div className="container_pedido-coc">
        {idPedido === 0 && (
          <div/>
        )}
      </div>
    </>
  );
  
  }