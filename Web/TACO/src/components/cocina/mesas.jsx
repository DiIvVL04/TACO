import React from "react";
import './css/cocinaNavBar.css'
import './css/cocinaMesas.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import { CocinaNavBar } from "./navBar";

export const MesasCocina=()=>{
    return (
        <>
          <CocinaNavBar/>
          <div className="container-para-mesas">
            <div className="container_mesas">
              <div className="mesa_container">
                <p> Mesa 1</p>
                <img src={Mesa} alt="Mesa" />
                <div className="mesa_container_botones">
                  <button className="orden">Orden</button>
                  <button className="entrega">Entrega</button>
                </div>
              </div>
              <div className="mesa_container">Aca tendria que ser dinamico xd</div>
              
            </div>
            <div className="container_pedido"></div>
          </div>
        </>
      );
}