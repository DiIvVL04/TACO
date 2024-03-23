import React from "react";
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import { CocinaNavBar } from "./navBar";
import { Orden } from "./orden";

export const MesasCocina=()=>{
    return (
        <>
          <CocinaNavBar/>
          <div className="container-para-mesas-coc">
            <div className="container_mesas-coc">
              <div className="mesa_container-coc">
                <p> Mesa 1</p>
                <img src={Mesa} alt="Mesa" />
                <div className="mesa_container_botones-coc">
                  <button className="orden-coc">Orden</button>
                  <button className="entrega-coc">Entrega</button>
                </div>
              </div>
              <div className="mesa_container-coc">Aca tendria que ser dinamico xd</div>
              
            </div>
            <div className="container_pedido-coc">
              <Orden/>
            </div>
          </div>
        </>
      );
}