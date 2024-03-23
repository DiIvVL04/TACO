import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css'
import './css/cocinaPedido.css'

import axios from 'axios';

export const Orden =()=>{
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
            <div>
                <p> Ordenes</p>
                <p> Mesa </p>
                <div>
                    <p>Pedidos a entregar:</p>
                    {ordenes.map((orden, i) => (
                     <div key={orden.idOrdenes}>{i}- {orden.personalBean.nombre} - {orden.platilloBean.nombre}</div>
                    ))}
                </div>
            </div>
        </>
    )
}