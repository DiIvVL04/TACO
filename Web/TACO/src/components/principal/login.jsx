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
          <video className="video" width="100%" height="100%" autoPlay muted loop style={{ position: 'fixed', zIndex: '-1', top: '0', left: '0', objectFit: 'cover' }}>
            <source src={fondo} type="video/mp4" />
          </video>
        <div>
          <div className="container">
            <div className="logo">
              <img src={LogoTACO} alt="Logo" />
            </div>
            <br />
            <form>
              <div>
                <label htmlFor="email" className="chi">Correo electrónico</label>
                <input id="email" name="email" placeholder="Correo electrónico" type="email" />
              </div>
              <div>
                <label htmlFor="password" className="chi">Contraseña</label>
                <input id="password" name="password" placeholder="Contraseña" type="password" />
              </div>
              <button type="submit" className="boton" onClick={() => iniciarSesion()}>INICIAR SESIÓN</button>
            </form>
          </div>
        </div>
       
    </>
  );
    
}