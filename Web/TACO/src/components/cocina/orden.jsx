import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css';
import './css/cocinaPedido.css';

import axios from 'axios';
 
export const Orden =({idPedido, numMesa, mesa, personal, status}) => {
    const urlOrdenes = 'http://localhost:8081/api/Proyecto_Integrador/orden/pedidos';
    const [ ordenes, setOrdenes ] = useState([]);
    let token = localStorage.getItem("token");

    useEffect(() => { 
        getOrdenes();
    }, [idPedido, numMesa]);
    
    const [isLoading, setIsLoading] = useState(false);

const getOrdenes = async () => {
  setIsLoading(true);
  if (idPedido != 0) {
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
      let respuesta2= respuesta.data.data
      if (status == false) {
        setOrdenes(respuesta2);
      }
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log('');
      setIsLoading(false);
    });
  } else {
    setOrdenes([]);
    setIsLoading(false);
  }
}


return (
  <>
    <div className="container-pedido">
      <div className="num-orden">
        <p>Detalles del Pedido </p>
      </div>
      {
        ordenes !== undefined ? (
          ordenes
            .filter(orden => orden.status === false)
            .map(orden => (
              <div key={orden.idOrdenes}>
                <div>
                  <div className="platillos">
                    <p>{orden.platilloBean.nombre}</p>
                    <p className="precio">${orden.platilloBean.precio}</p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No hay órdenes disponibles</p>
        )
      }
    </div>
  </>
);

}