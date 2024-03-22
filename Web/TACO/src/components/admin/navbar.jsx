import './css/adminNavBar.css'
import React from 'react'
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
export const NavBarAdmin=()=>{
    return(
        <>
            <div className="container_navbar_adm">
            <nav>
            <div className="logo">
                <img src={LogoTACO} alt="Logo" />
            </div>
            <ul>
                <button className='botoncito' onClick={() => { window.location='/MesasAdm'}}>Mesas</button>
                <button className='botoncito' onClick={() => { window.location='/InsumosAdm'}}>Insumos</button>
                <button className='botoncito' onClick={() => { window.location='/ConfigAdm'}}>Configuración</button>
                <button className='botoncito' onClick={() => { window.location='/'}}>Cerrar Sesión</button>
            </ul>
            </nav>
      </div>
        </>
    )
}