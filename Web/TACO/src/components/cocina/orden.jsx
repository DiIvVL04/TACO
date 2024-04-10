import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css';
import './css/cocinaPedido.css';

import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
 
export const Orden =({idPedido, numMesa, mesa, personal, status}) => {
    const urlOrdenes = 'http://localhost:8081/api/Proyecto_Integrador/orden/pedidos';
    const [ ordenes, setOrdenes ] = useState([]);
    let token = localStorage.getItem("token");

    useEffect(() => { 
        getOrdenes();
    }, [idPedido, numMesa]);
    
    const getOrdenes= async ()=>{
        if(idPedido != 0){
            await axios({
                method: 'POST',
                url: urlOrdenes,
                data: {
                    "pedidoBean": {
                        "idPedidos": idPedido
                    }
                },
                headers: {
                    Authorization: `Bearer ${token}`
                  }
              }).then(function (respuesta) {
                console.log(status);
                if(status == false){
                    console.log(respuesta.data.data);
                    setOrdenes(respuesta.data.data);
                    //console.log("Ordenes");
                    //console.log(ordenes);
                }
                
              })
              .catch(function (error) {
                console.log(error);
              });

        } else {
            setOrdenes([]);
        }
    }

    return(
        <>
            <div  className="container-pedido">
                <div className="num-orden">
                    <p>Detalles del Pedido </p>
                </div>
                {ordenes != undefined ? 
                    ordenes.map((orden, i) => (
                <div key={i}>                
                    <div>
                        <p key={orden.idCaja}></p>

                        <div className="platillos">
                            <p>{orden.platilloBean.nombre}</p>
                            <p className="precio">${orden.platilloBean.precio}</p>
                        </div>
                    </div>                    
                </div>
                )) : <p></p> }

                {/*<button className="cobrar-caja"  onClick={() => {cobrarPedido()} }>Cobrar</button>*/}
            </div>

        </>
    )
}