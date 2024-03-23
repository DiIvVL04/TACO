import '../principal/css/cssPrincipal.css'
import fondo from "../../../public/assets/vids/fondo.mp4"
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png"
import Swal from 'sweetalert2'
export const Login=()=>{

const iniciarSesion = () => {
    Swal.fire({
        title: "Inicio de sesión exitoso!",
        text: "Bienvenido a TACO!",
        icon: "success"
      });
}

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
              <form>
                <div>
                  <label className="chi-princ">Correo electrónico</label>
                  <input className='input-princ' id="email" name="email" placeholder="Correo electrónico" type="email" />
                </div>
                <div>
                  <label className="chi-princ">Contraseña</label>
                  <input className='input-princ' id="password" name="password" placeholder="Contraseña" type="password" />
                </div>
                <button type="submit" className="boton-princ" onClick={() => iniciarSesion()}>INICIAR SESIÓN</button>
              </form>
            </div>
          </div>
       </div>
          
       
    </>
  );
    
}