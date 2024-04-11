import React, { useState } from 'react'
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
import './css/cocinaNavBar.css'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const CocinaNavBar=({selected})=>{
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
      <div className="container_navbar_cocina">
        <nav className="nav_cocina-coc">
      
      <ul>
          <button className={ selectedItem == 1 ? 'botoncito-coc2': 'botoncito-coc'} style={ selectedItem == 1 ? {border: '1px solid pink'} : {}} onClick={() => { window.location='/MesasCocina'}}>Mesas</button>
          <button className={ selectedItem == 2 ? 'botoncito-coc2': 'botoncito-coc'} style={ selectedItem == 2 ? {border: '1px solid pink'} : {}} onClick={() => { window.location='/InsumosCocina'}}>Platillos</button>
          <button className="bt-hover-adm" disabled>
            <div className="logo-coc">
              <img src={LogoTACO} alt="Logo" />
            </div>
          </button>
          <button className={ selectedItem == 3 ? 'botoncito-coc2': 'botoncito-coc'} style={ selectedItem == 3 ? {border: '1px solid pink'} : {}} onClick={() => { window.location='/ConfigCocina'}}>Configuración</button>
          <button className={ selectedItem == 4 ? 'botoncito-coc2': 'botoncito-coc'} style={ selectedItem == 4 ? {border: '1px solid pink'} : {}} onClick={() => cerrarSesion()}>Cerrar Sesión</button>
      </ul>
      </nav>
    </div>
      </>
  )
}