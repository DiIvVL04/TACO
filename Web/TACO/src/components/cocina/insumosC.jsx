import LogoTACO from "../../assets/imgs/LogoTACO.png"
import { Login } from "../principal/login"
import { Configuracion } from "./configuracion"
import { MesasC } from "./mesasC"


export const InsumosC = () => {
    return (
    <>
         <div className="container_navbar">
      <nav id="navbar">
        <div className="logo">
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
    <div className="container">
      <p> Leguminosas</p>
      <table>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Estado</th>
        </tr>
        <tr>
          <td>Frijoles negros</td>
          <td>2kg</td>
          <td><img src="../assets/check.png"/></td>
        </tr>
        <tr>
          <td>Granos de maíz</td>
          <td>0kg</td>
          <td><img src="../assets/cross.png"/></td>
        </tr>
      </table>
      <br/>
    </div>
    </>
    )
}