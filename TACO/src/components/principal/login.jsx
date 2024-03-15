import './css/index2.css'
import fondo from "../../assets/imgs/fondo.mp4"
import LogoTACO from "../../assets/imgs/LogoTACO.png"

export const Login = () => {
    return (
        <>
        <video className="video" width="100%" height="100%" autoplay muted loop style="position: fixed; z-index: -1; top: 0; left: 0; object-fit: cover;">
        <source src={fondo} type="video/mp4"/>
    </video>
    <div>
        <div className="container">
            <div className="logo"> 
                <img src={LogoTACO}/>
            </div> <br/>
            <form>
                <div>
                    <label for="email" className="chi">Correo electrónico</label>
                    <input id="email" name="email" placeholder="Correo electrónico" type="email"/>
                </div>
                <div>
                    <label for="password" className="chi">Contraseña</label>
                    <input id="password" name="password" placeholder="Contraseña" type="password"/>
                </div>
                <button type="submit" className="boton">INICIAR SESIÓN</button>
            </form>
        </div>
    </div>
        </>
    )
}