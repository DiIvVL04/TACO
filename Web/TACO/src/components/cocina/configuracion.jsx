import React from "react";
import User from "../../../public/assets/imgs/user.png"
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import { CocinaNavBar } from "./navBar";
export const ConfiguracionCocina=()=>{
    return (
        <>
        <CocinaNavBar/>
          <div className="container-user-coc">
            <div className="container_imagen-coc">
              <img src={User} alt="User" />
            </div>
            <div className="container_formulario-coc">
              <form>
                <div>
                  <label className="label-coc">Usuario</label>
                  <input id="usuario-coc" name="usuario" placeholder="Usuario" />
                </div>
                <div>
                  <label className="label-coc">Correo electrónico</label>
                  <input id="email-coc" name="email" placeholder="Correo electrónico" type="email" />
                </div>
                <div>
                  <label className="label-coc">Contraseña</label>
                  <input id="password-coc" name="password" placeholder="Contraseña" type="password" />
                </div>
                <button type="submit" className="boton-coc">Guardar</button>
              </form>
            </div>
          </div>
          
          </>
    )
}