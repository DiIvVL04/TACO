import './css/cajaNavBar.css'
import React from 'react'
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
export const NavBarCaja=()=>{
    return(
        <>
            <div className="container_navbar_caja">
                <nav>
                <div className="logo">
                    <img src={LogoTACO} alt="Logo" />
                </div>
                <ul>
                    <button className='botoncito' onClick={() => { window.location='/MesasCaja'}}>Mesas</button>
                    <button className='botoncito' onClick={() => { window.location='/ConfigCaja'}}>Configuración</button>
                    <button className='botoncito' onClick={() => { window.location='/'}}>Cerrar Sesión</button>
                </ul>
                </nav>
            </div>
        </>
    )
}