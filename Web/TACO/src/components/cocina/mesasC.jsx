import LogoTACO from "../../assets/imgs/LogoTACO.png"
import Mesa from "../../assets/imgs/mesa.png"
import { Login } from "../principal/login"
import { Configuracion } from "./configuracion"
import { InsumosC } from "./insumosC"
import '../cocina/css/mesas.css'

export const MesasC = () => {

  return (
    <>
    <div className="mesasconf">
      <div className="container_nav">
            <nav className="navbarmes">
                <div className="logomes">
                    <img src={LogoTACO} alt="LogoTACO" />
                </div>
                <div className="nav-buttonscocina">
                    <button onClick={() => { window.location='/MesasC'}}>Mesas</button>
                    <button onClick={() => { window.location='/Insumos'}}>Insumos</button>
                    <button onClick={() => { window.location='/Configuracion'}}>Configuración</button>
                    <button onClick={() => { window.location='/Login'}}>Cerrar Sesión</button>
                </div>
            </nav>
        </div>
      <div className="container_mesas1">
        <div className="container_mesas">
          <div className="mesa_container">
            <p> Mesa 1</p>
            <img src={Mesa}/>
            <div className="mesa_container_botones">
              <button className="orden">Orden</button>
              <button className="entrega">Entrega</button>
            </div>
          </div>
          <div className="mesa_container">

          </div>
          <div className="mesa_container">

          </div>
          <div className="mesa_container">

          </div>

        </div>
        {/*<div className="container_pedidococin">
            falta acomodar
        </div>*/}
      </div>
      </div>
    </>
  )

}