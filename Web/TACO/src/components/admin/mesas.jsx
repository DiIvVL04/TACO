import LogoTACO from "../../assets/imgs/LogoTACO.png"
import Mesa from "../../assets/imgs/mesa.png"
import './css/mesasadmin.css'

export const Mesas = () => {

    return (
        <>
            <div className="adminbody">
                <div className="container_navbaradm">
                    <nav className="navadm">
                        <div className="logo">
                        <img src={LogoTACO} alt="LogoTACO" />
                        </div>-
                        <div className="nav-buttons">
                    <button onClick={() => { window.location='/Mesas'}}>Mesas</button>
                    <button onClick={() => { window.location='/Insumos'}}>Insumos</button>
                    <button onClick={() => { window.location='/Configuracionadm'}}>Configuración</button>
                    <button onClick={() => { window.location='/Login'}}>Cerrar Sesión</button>
                </div>
                    </nav>
                </div>

                <div className="containeradm">
                    <div className="container_mesas">
                        <div className="mesa_container">
                            <p> Mesa 1</p>
                            <img src={Mesa} />
                            <div className="mesa_container_botones">
                                <button className="administrar">Administrar</button>
                            </div>
                        </div>
                        <div className="mesa_container" id="agregarMesa">
                            <img src={Mesa} />
                            <p> Agregar mesa</p>
                        </div>
                    </div>
                    <div className="container_pedido">

                    </div>
                </div>
            </div>
           
        </>
        
    )
}