import React from "react";
import './css/cajaNavBar.css'
import './css/cajaMesas.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import { NavBarCaja } from "./navbar";
export const MesasCaja=()=>{
    return (
        <>
          <NavBarCaja/>
          <div className="container-para-mesas">
            <div className="container_mesas">
              <div className="mesa_container">
                <p> Mesa 1</p>
                <img src={Mesa} alt="Mesa" />
                <div className="mesa_container_botones">
                  <button className="cobrar">Cobrar</button>
                </div>
              </div>
              <div className="mesa_container">Aca tendria que ser dinamico xd</div>
              
            </div>
            <div className="container_pedido"></div>
          </div>
        </>
    )
}