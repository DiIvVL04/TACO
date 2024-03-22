import React from "react";
import User from "../../../public/assets/imgs/user.png"
import './css/cocinaNavBar.css'
import './css/cocinaConfig.css'
import { CocinaNavBar } from "./navBar";
export const ConfiguracionCocina=()=>{
    return (
        <>
        <CocinaNavBar/>
          <div className="container-user">
            <div className="container_imagen">
              <img src={User} alt="User" />
            </div>
            <div className="container_formulario">
              <form>
                <div>
                  <label htmlFor="usuario" className="usuario">Usuario</label>
                  <input id="usuario-coc" name="usuario" placeholder="Usuario" />
                </div>
                <div>
                  <label htmlFor="email" className="enail">Correo electrónico</label>
                  <input id="email-coc" name="email" placeholder="Correo electrónico" type="email" />
                </div>
                <div>
                  <label htmlFor="password" className="password">Contraseña</label>
                  <input id="password-coc" name="password" placeholder="Contraseña" type="password" />
                </div>
                <button type="submit" className="boton-coc">Guardar</button>
              </form>
            </div>
          </div>
          
          </>
    )
}