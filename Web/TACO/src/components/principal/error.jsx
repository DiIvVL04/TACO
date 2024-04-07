import '../principal/css/cssPrincipal.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from "../../../public/assets/vids/fondo.mp4";
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png";

export const Error = () => {

    const navigate = useNavigate();
    const volver = () => {
        navigate(-1);
    };

  return (
    <div className='body-princ'>
      <video className='video-princ' width="100%" height="100%" autoPlay muted loop style={{ position: 'fixed', zIndex: '-1', top: '0', left: '0', objectFit: 'cover' }}>
        <source src={fondo} type="video/mp4" />
      </video>
      <div>
        <div className='container-error'>
            <img src={LogoTACO} alt="LogoTACO 404" className='logo-error' />
            <h1 className='error404'>404</h1>
            <p className='mensaje404'>Oops! Página no encontrada.</p>
            <p className='mensaje404'>Lo sentimos, la página que estás buscando no existe.</p>
            <button onClick={volver} className='boton404'>Volver</button>
        </div>
      </div>
      
    </div>
  );
};
