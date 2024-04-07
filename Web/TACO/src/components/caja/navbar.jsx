import './css/cajaNavBar.css';
import React, { useState } from 'react';
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const NavBarCaja=({selected})=>{
    const [ selectedItem, setSelectedItem ] = useState(selected);

    const cerrarSesion = (id_, name, validar) => {
        let mensaje, tittle, confirm;
  
        tittle = 'Cerrar Sesión';
        mensaje = '¿Seguro de cerrar la sesión actual?';
        confirm = 'Cerrar Sesión';
  
        const MySawl = withReactContent(Swal);
        MySawl.fire({ 
          title: tittle,
          icon: 'question', text: mensaje,
          showCancelButton: true, confirmButtonText: confirm, cancelButtonText: 'Cancelar'
        }).then((result) => {
          if(result.isConfirmed){
            localStorage.clear();
            window.location = '/';
          } 
        });
      }

    return(
        <>
            <div className="container_navbar_caja">
                <nav className='nav-caja'>
                <div className="logo-caja">
                    <img src={LogoTACO} alt="Logo" />
                </div>
                <ul>
                    <button className={ selectedItem == 1 ? 'botoncito-caja2': 'botoncito-caja'} style={ selectedItem == 1 ? {border: '1px solid rgb(101, 101, 255)'} : {}} onClick={() => { window.location='/MesasCaja'}}>Mesas</button>
                    <button className="bt-hover-caja" ></button>
                    <button className="bt-hover-caja" ></button>
                    <button className={ selectedItem == 2 ? 'botoncito-caja2': 'botoncito-caja'} style={ selectedItem == 2 ? {border: '1px solid rgb(101, 101, 255)'} : {}} onClick={() => { window.location='/ConfigCaja'}}>Configuración</button>
                    <button className='botoncito-caja' onClick={() => cerrarSesion()}>Cerrar Sesión</button>
                </ul>
                </nav>
            </div>
        </>
    )
}