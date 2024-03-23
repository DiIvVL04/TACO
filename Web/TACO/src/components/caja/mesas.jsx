import React from "react";
import './css/cajaNavBar.css'
import './css/cajaBody.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import { NavBarCaja } from "./navbar";
export const MesasCaja=()=>{
    return (
        <>
          <NavBarCaja/>
          <div className="container-para-mesas-caja">
            <div className="container_mesas-caja">
              <div className="mesa_container-caja">
                <p> Mesa 1</p>
                <img src={Mesa} alt="Mesa" />
                <div className="mesa_container_botones-caja">
                  <button className="cobrar-caja">Cobrar</button>
                </div>
              </div>
              <div className="mesa_container-caja">Aca tendria que ser dinamico xd</div>
              
            </div>
            <div className="container_pedido-caja"></div>
          </div>
        </>
    )
}