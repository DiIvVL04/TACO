import React from "react"
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
export const CocinaNavBar=()=>{
    return(
        <>
          <div className="container_navbar_cocina">
            <nav id="navbar">
              <div className="logo">
                <img src={LogoTACO} alt="Logo" />
              </div>
              <ul>
                <button className="botoncito" onClick={() => { window.location='/MesasCocina'}}>Mesas</button>
                <button className="botoncito" onClick={() => { window.location='/InsumosCocina'}}>Insumos</button>
                <button className="botoncito" onClick={() => { window.location='/ConfigCocina'}}>Configuración</button>
                <button className="botoncito" onClick={() => { window.location='/'}}>Cerrar Sesión</button>
              </ul>
            </nav>
          </div>
        </>
    )
}