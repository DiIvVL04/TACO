import LogoTACO from "../../assets/imgs/LogoTACO.png";
import { Link } from "react-router-dom"; // Importa Link para el enrutamiento
import Check from "../../assets/imgs/check.png";
import Cross from "../../assets/imgs/cross.png";
import '../cocina/css/insumos.css';

export const InsumosC = () => {
    return (
        <div className="bodyins">
            <div className="container_navbarins">
                <nav className="navbarins">
                    <div className="logoins">
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
            <div className="containerins">
                <p>Leguminosas</p>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Frijoles negros</td>
                            <td>2kg</td>
                            <td><img src={Check} alt="Check" /></td>
                        </tr>
                        <tr>
                            <td>Granos de maíz</td>
                            <td>0kg</td>
                            <td><img src={Cross} alt="Cross" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
