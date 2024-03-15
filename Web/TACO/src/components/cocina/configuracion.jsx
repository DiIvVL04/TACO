import LogoTACO from "../../assets/imgs/LogoTACO.png"
import { Login } from "../principal/login";
import './css/config.css'
import { useNavigate } from 'react-router-dom';
import { InsumosC } from "./insumosC";
import { MesasC } from "./mesasC";

export const Configuracion = () => {

    const navigate = useNavigate();

    const handleClick = () => {
       navigate('/login', { replace: true });
     };

    return (
        <>
        <div className="body">
            <div className="container_navbar">
                <nav id="navbar">
                    <div className="logo">
                        <img src={LogoTACO} />
                    </div>
                    <ul>
                        <li><button onClick={() => MesasC()}><a>Mesas</a></button></li>
                        <li><button onClick={() => InsumosC()}><a>Insumos</a></button></li>
                        <li><button onClick={() => Configuracion()}><a>Configuración</a></button></li>
                        <li><button onClick={() => Login()}><a>Cerrar Sesión</a></button></li>
                    </ul>
                </nav>
            </div>
            <div className="container">
                <div className="container_imagen">
                    <img src="../assets/user.png" />

                </div>
                <div className="container_formulario">
                    <form>
                        <div>
                            <label form="usuario" className="usuario">Usuario</label>
                            <input id="usuario" name="usuario" placeholder="Usuario" />
                        </div>
                        <div>
                            <label form="email" className="chi">Correo electrónico</label>
                            <input id="email" name="email" placeholder="Correo electrónico" type="email" />
                        </div>
                        <div>
                            <label form="password" className="chi">Contraseña</label>
                            <input id="password" name="password" placeholder="Contraseña" type="password" />
                        </div>
                        <button type="submit" className="boton">Guardar</button>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}