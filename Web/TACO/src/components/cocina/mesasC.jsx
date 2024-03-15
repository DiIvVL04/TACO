import LogoTACO from "../../assets/imgs/LogoTACO.png"
import { Login } from "../principal/login"
import { Configuracion } from "./configuracion"
import { InsumosC } from "./insumosC"

export const MesasC = () => {

    reutrn (
        <>
            <div class="container_navbar">
    <nav id="navbar">
      <div class="logo">
          <img src={LogoTACO}/>
        </div>
      <ul>
        <li><button onClick={() => MesasC()}><a>Mesas</a></button></li>
        <li><button onClick={() => InsumosC()}><a>Insumos</a></button></li>
          <li><button onClick={() => Configuracion()}><a>Configuración</a></button></li>
        <li><button onClick={() => Login()}><a>Cerrar Sesión</a></button></li>
      </ul>
    </nav>
  </div>
  
  <div class="container">
    <div class="container_mesas">
      <div class="mesa_container">
        <p> Mesa 1</p>
        <img src="../assets/mesa.png"/>
        <div class="mesa_container_botones">
          <button class="orden">Orden</button>
          <button class="entrega">Entrega</button>
        </div>  
      </div>
      <div class="mesa_container">

      </div>
      <div class="mesa_container">

      </div>
      <div class="mesa_container">

      </div>
      <div class="mesa_container">

      </div>
      
    </div>
    <div class="container_pedido">

    </div>
  </div>
        </>
    )

}