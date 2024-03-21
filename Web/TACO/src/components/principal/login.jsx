import '../principal/css/index2.css';
import fondo from "../../assets/imgs/fondo.mp4";
import LogoTACO from "../../assets/imgs/LogoTACO.png";
import Swal from 'sweetalert2';

export const Login = () => {

    const iniciarSesion = () => {
        Swal.fire({
            title: "Inicio de sesión exitoso!",
            text: "Bienvenido a TACO!",
            icon: "success"
        });
    };

    return (
        <div className="video-background">
            <video autoPlay muted loop className="video">
                <source src={fondo} type="video/mp4" />
            </video>
            <div className="login-container">
                <form className='Cardinicio'>
                    <div className="logolog">
                        <img src={LogoTACO} alt="Logo TACO" style={{width:300, height:150}} />
                    </div>
                    <div>
                        <label htmlFor='email' className="chi">Correo Electrónico</label>
                        <input id="email" name="email" type="email" />
                    </div>
                    <div>
                        <label htmlFor='password' className="chi">Contraseña</label>
                        <input id="password" name="password"  type="password" />
                    </div>

                    <button type="button" className="btnlogin" onClick={() => iniciarSesion()}>INICIAR SESIÓN</button>

                </form>
            </div>
        </div>
    );
};
