import React from "react"
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
import './css/cocinaNavBar.css'
export const CocinaNavBar=()=>{
    return(
        <>
          <div className="container_navbar_cocina">
            <nav className="nav_cocina-coc">
              <div className="logo-coc">
                <img src={LogoTACO} alt="Logo" />
              </div>
              <ul>
                <button className="botoncito-coc" onClick={() => { window.location='/MesasCocina'}}>Mesas</button>
                <button className="botoncito-coc" onClick={() => { window.location='/InsumosCocina'}}>Insumos</button>
                <button className="bt-hover-coc" ></button>
                <button className="botoncito-coc" onClick={() => { window.location='/ConfigCocina'}}>Configuración</button>
                <button className="botoncito-coc" onClick={() => { window.location='/'}}>Cerrar Sesión</button>
              </ul>
            </nav>
          </div>
        </>
    )
}