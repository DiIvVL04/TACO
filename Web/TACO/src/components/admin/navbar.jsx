import './css/adminNavBar.css'
import React from 'react'
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
export const NavBarAdmin=()=>{
    return(
        <>
            <div className="container_navbar_adm">
            <nav className='nav-adm'>
            <div className="logo-adm">
                <img src={LogoTACO} alt="Logo" />
            </div>
            <ul>
                <button className='botoncito-adm' onClick={() => { window.location='/MesasAdm'}}>Mesas</button>
                <button className='botoncito-adm' onClick={() => { window.location='/InsumosAdm'}}>Insumos</button>
                <button className="bt-hover-adm" ></button>
                <button className='botoncito-adm' onClick={() => { window.location='/ConfigAdm'}}>Configuración</button>
                <button className='botoncito-adm' onClick={() => { window.location='/'}}>Cerrar Sesión</button>
            </ul>
            </nav>
      </div>
        </>
    )
}