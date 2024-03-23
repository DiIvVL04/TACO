import './css/cajaNavBar.css'
import React from 'react'
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
export const NavBarCaja=()=>{
    return(
        <>
            <div className="container_navbar_caja">
                <nav className='nav-caja'>
                <div className="logo-caja">
                    <img src={LogoTACO} alt="Logo" />
                </div>
                <ul>
                    <button className='botoncito-caja' onClick={() => { window.location='/MesasCaja'}}>Mesas</button>
                    <button className="bt-hover-caja" ></button>
                    <button className="bt-hover-caja" ></button>
                    <button className='botoncito-caja' onClick={() => { window.location='/ConfigCaja'}}>Configuración</button>
                    <button className='botoncito-caja' onClick={() => { window.location='/'}}>Cerrar Sesión</button>
                </ul>
                </nav>
            </div>
        </>
    )
}