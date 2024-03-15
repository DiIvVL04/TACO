import './css/index2.css'
import fondo from "../../assets/imgs/fondo.mp4"
import LogoTACO from "../../assets/imgs/LogoTACO.png"
import Swal from 'sweetalert2'

export const Login = () => {

    const iniciarSesion = () => {
        Swal.fire({
            title: "Inicio de sesión exitoso!",
            text: "Bienvenido a TACO!",
            icon: "success"
          });
    }

    

    return (
        <>
        <video className="video" autoPlay muted loop >
            <source src={fondo} type="video/mp4"/>
        </video>
    <div className='body'>
        <div className="container">
            <div className="logo"> 
                <img src={LogoTACO}/>
            </div> <br/>
            <form>
                <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'center'}}>
                    <label form='email' className="chi">Correo electrónico</label>
                    <input id="email" name="email" placeholder="Correo electrónico" type="email"/>
                </div>
                <div>
                    <label form='password' className="chi">Contraseña</label>
                    <input id="password" name="password" placeholder="Contraseña" type="password"/>
                </div>
                <button type="submit" className="boton" onClick={() => iniciarSesion()}>INICIAR SESIÓN</button>
            </form>
        </div>
    </div>
        </>
    )
}