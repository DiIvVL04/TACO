import './css/adminNavBar.css'
import React, { useState } from 'react'
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const NavBarAdmin=({selected})=>{
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
          window.location = '/';
        } 
      });
    }

    return(
        <>
        <div className="container_navbar_adm">
          <nav className='nav-adm'>
          
          <ul>
              <button className={ selectedItem == 1 ? 'botoncito-adm2': 'botoncito-adm'} style={ selectedItem == 1 ? {border: '1px solid red'} : {}} onClick={() => { window.location='/MesasAdm'}}>Mesas</button>
              <button className={ selectedItem == 2 ? 'botoncito-adm2': 'botoncito-adm'} style={ selectedItem == 2 ? {border: '1px solid red'} : {}} onClick={() => { window.location='/InsumosAdm'}}>Platillos</button>
              <button className="bt-hover-adm" >
                <div className="logo-adm">
                  <img src={LogoTACO} alt="Logo" />
                </div>
              </button>
              <button className={ selectedItem == 3 ? 'botoncito-adm2': 'botoncito-adm'} style={ selectedItem == 3 ? {border: '1px solid red'} : {}} onClick={() => { window.location='/ConfigAdm'}}>Configuración</button>
              <button className={ selectedItem == 4 ? 'botoncito-adm2': 'botoncito-adm'} style={ selectedItem == 4 ? {border: '1px solid red'} : {}} onClick={() => cerrarSesion()}>Cerrar Sesión</button>
          </ul>
          </nav>
        </div>
        </>
    )
}