import LogoTACO from "../../assets/imgs/LogoTACO.png"
import { Login } from "../principal/login";
import '../cocina/css/config.css'
import { InsumosC } from "./insumosC";
import { MesasC } from "./mesasC";
import User from "../../assets/imgs/user.png"

export const Configuracion = () => {

    return (
        <>
        <div className="bodyconf">
        <div className="container_navbarconf">
            <nav className="navbarconf">
                <div className="logoconf">
                    <img src={LogoTACO} alt="LogoTACO" />
                </div>
                <div className="nav-buttons">
                    <button onClick={() => { window.location='/Mesas'}}>Mesas</button>
                    <button onClick={() => { window.location='/Insumos'}}>Insumos</button>
                    <button onClick={() => { window.location='/Configuracion'}}>Configuración</button>
                    <button onClick={() => { window.location='/Login'}}>Cerrar Sesión</button>
                </div>
            </nav>
        </div>
            <div className="containerconf">
                <div className="container_imagen">
                    <img src={User} />

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