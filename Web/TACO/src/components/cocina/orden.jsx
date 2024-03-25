import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css'
import './css/cocinaPedido.css'

import axios from 'axios';
 
export const Orden =({Pedido, numMesa}) => {
    const urlOrdenes = 'http://localhost:8081/api/Proyecto_Integrador/orden/obtener';
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        getOrdenes();
    }, []);
    
    const getOrdenes= async ()=>{
        const response = await axios.get(urlOrdenes);
        console.log(response.data.data)
        setOrdenes(response.data.data);
    }
    return(
        <>
            <div  className="container-pedido">
                {ordenes != undefined ? 
                    ordenes.map((orden, i) => (
                <div>
                <div className="num-orden">
                    <span>Orden #{orden.idCaja}</span>
                    <p>Mesa {numMesa}</p>
                </div>
                        <div>
                            <p key={orden.idCaja}></p>

                            <div className="platillos">
                                
                                <p>{orden.platilloBean.nombre}</p>
                                <p className="precio">{orden.platilloBean.precio}</p>
                            </div>
                        </div>
                    
                </div>
                )) :
                    <p></p>
                    }
            </div>

        </>
    )
}