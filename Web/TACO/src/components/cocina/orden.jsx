import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css'
import './css/cocinaPedido.css'

import axios from 'axios';
 
export const Orden =({Pedido, numMesa}) => {
    console.log(Pedido.cajaBeans);
    let ordenes = Pedido.cajaBeans;

    useEffect(() => {
    }, []);
    
    return(
        <>
            <div>
                <p>Ordenes</p>
                <p>Mesa {numMesa}</p>
                <div>
                    <p>Pedidos a entregar:</p>
                    {ordenes != undefined ? 
                    ordenes.map((orden, i) => (
                        <div>
                            <p key={orden.idCaja}>Orden #{orden.idCaja} {orden.ordenBean.personalBean.nombre}</p>
                            <p>{orden.ordenBean.platilloBean.nombre}</p>
                        </div>
                    )) :
                    <p></p>
                    }
                </div>
            </div>
        </>
    )
}