import '../principal/css/cssPrincipal.css'
import fondo from "../../../public/assets/vids/fondo.mp4"
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'
export const Login=()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const urlPersonal = 'http://localhost:8081/api/Proyecto_Integrador/personal/';

  const iniciarSesion = async () => {
    if (!email || !password) {
      Swal.fire('Error', 'Por favor, ingresa un correo electrónico y contraseña', 'error');
      return;
    }
    
    try {
      const respuesta = await axios.get(urlPersonal + 'obtener');
      const usuarios = respuesta.data.data;
      
      if (usuarios.length > 0) {
        const usuarioValido = usuarios.find(user =>user.email === email  && user.password === password);
        
        if (usuarioValido) {
          const rol = usuarioValido.rol;
          const nombre = usuarioValido.nombre;
          console.log(`${rol} de ${nombre}`);
          
          switch (rol) {
            case 'Admin':
              window.location.href = '/MesasAdm';
              break;
            case 'Caja':
              window.location.href = '/MesasCaja';
              break;
            case 'Cocina':
              window.location.href = '/MesasCocina';
              break;
            default:
              Swal.fire({
                iconHtml: `<img src="${LogoTACO}" style="width: 250px; height: auto;">`, 
                title: 'Error',
                text: 'El mesero no puede acceder a la interfaz web'
              });
              break;
          }
        } else {
          Swal.fire('Error', 'Correo y/o contraseña incorrectos', 'error');
        }
      } else {
        Swal.fire('Error', 'No se encontraron usuarios', 'error');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire('Error', 'Correo y/o contraseña equivocados', 'error');
    }
  };
  

    return(
       <>
       <div className='body-princ'>
          <video className="video-princ" width="100%" height="100%" autoPlay muted loop style={{ position: 'fixed', zIndex: '-1', top: '0', left: '0', objectFit: 'cover' }}>
            <source src={fondo} type="video/mp4" />
          </video>
          <div>
            <div className="container-princ">
              <div className="logo-princ">
                <img src={LogoTACO} alt="Logo" />
              </div>
              <br />
              <form onSubmit={(event) => { event.preventDefault(); iniciarSesion() }}>
                <div>
                  <label className="chi-princ">Correo electrónico</label>
                  <input className='input-princ' id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Correo electrónico" type="email" required />
                </div>
                <div>
                  <label className="chi-princ">Contraseña</label>
                  <input className='input-princ' id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Contraseña" type="password" required />
                </div>
                <button type="submit" className="boton-princ" onClick={() => iniciarSesion()}>INICIAR SESIÓN</button>
              </form>
            </div>
          </div>
       </div>
          
       
    </>
  );
    
}