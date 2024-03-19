import LogoTACO from "../../assets/imgs/LogoTACO.png"
import Mesa from "../../assets/imgs/mesa.png"
import { Login } from "../principal/login"
import { ConfigCaja } from "../caja/configcaja.jsx"
import '../caja/css/cajaind.css'

export const Index = () => {

  return (
    <>
    <div className="mesasconf">
      <div className="container_navbarmes">
            <nav className="nav">
                <div className="logomes">
                    <img src={LogoTACO} alt="LogoTACO" />
                </div>
                <div className="nav-buttons">
                    <button onClick={() => { window.location='/Index'}}>Inicio</button>
                    <button onClick={() => { window.location='/ConfigCaja'}}>Configuración</button>
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
        <div className="container_pedido">

        </div>
      </div>
      </div>
    </>
    /*
        <script>
    function Agregar() {
      var nuevaMesa = document.createElement('div');
      nuevaMesa.classList.add('mesa_container');
      nuevaMesa.innerHTML = 
      `<p> Mesa ${document.querySelectorAll('.mesa_container').length}</p>
        <img src="../assets/mesa.png"/>
        <div className="mesa_container_botones">
          <button className="administrar">Administrar</button>
        </div>`;
      var agregarMesa = document.getElementById('agregarMesa');
      agregarMesa.parentNode.insertBefore(nuevaMesa, agregarMesa); //agrega a la izquierda del sumar
    }
    document.getElementById('agregarMesa').addEventListener('click', Agregar);
  </script>
        */
  )

}