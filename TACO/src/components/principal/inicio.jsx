import './css/index.css'
import fondo from "../../assets/imgs/fondo.mp4"
import LogoTACO from "../../assets/imgs/LogoTACO.png"
import { useNavigate } from 'react-router-dom';

export const Inicio = () => {

     const navigate = useNavigate();

     const handleClick = () => {
        navigate('/login', { replace: true });
      };

    return (
        <>
            <video className='video' width="100%" height="100%" autoPlay muted loop >
                <source src={fondo} type="video/mp4" />
            </video>
            <div className='body'>
                <div className="container">
                    <div className="container">
                        <div className="logo">
                            <img src={LogoTACO} />
                        </div>
                        <p className="taco"> Proyecto Tecnológico de Administración y Control de Órdenes</p>
                        <button onClick={handleClick} className="boton" id="inicio" > INICIAR SESIÓN</button>
                    </div>
                </div>
            </div>
        </>
    )
}