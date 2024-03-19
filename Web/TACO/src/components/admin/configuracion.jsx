import './css/confad.css'
import User from '../../assets/imgs/user.png'
import LogoTaco from '../../assets/imgs/LogoTACO.png'

export const Configuracionadm = () => {
    return (
        <>
            <div className="conf_adm">
            <div className="container_navbarconfad">
      <nav id="navconfad">
      <div className="logo">
                        <img src={LogoTaco} alt="LogoTACO" />
                        </div>
                        <div className="nav-buttons">
                    <button onClick={() => { window.location='/Mesas'}}>Mesas</button>
                    <button onClick={() => { window.location='/Insumos'}}>Insumos</button>
                    <button onClick={() => { window.location='/Configuracionadm'}}>Configuración</button>
                    <button onClick={() => { window.location='/Login'}}>Cerrar Sesión</button>
                </div>
      </nav>
    </div>
    <div className="container">
      <div className="container_imagen">
        <img src={User}/>

      </div>
      <div className="container_formulario">
        <form>
          <div>
            <label for="usuario" className="usuario">Usuario</label>
            <input id="usuario" name="usuario" placeholder="Usuario"/>
          </div>
          <div>
              <label for="email" className="chi">Correo electrónico</label>
              <input id="email" name="email" placeholder="Correo electrónico" type="email"/>
          </div>
          <div>
              <label for="password" className="chi">Contraseña</label>
              <input id="password" name="password" placeholder="Contraseña" type="password"/>
          </div>
          <button type="submit" className="boton">Guardar</button>
      </form>
      </div>
    </div>
            </div>
        </>
    )
}