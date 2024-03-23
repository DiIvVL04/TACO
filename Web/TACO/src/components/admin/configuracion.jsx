import './css/adminNavBar.css'
import './css/adminBody.css'
import React from 'react'

import User from '../../../public/assets/imgs/user.png'
import { NavBarAdmin } from './navbar'
export const ConfiguracionAdmin=()=>{
    return(
        <>
            <NavBarAdmin/>
            <div className="container-user-adm">
                <div className="container_imagen-adm">
                <img src={User} alt="User" />
                </div>
                <div className="container_formulario-adm">
                <form>
                    <div>
                    <label className="label-adm">Usuario</label>
                    <input id="usuario-adm" name="usuario" placeholder="Usuario" />
                    </div>
                    <div>
                    <labe className="label-adm">Correo electrónico</labe>
                    <input id="email-adm" name="email" placeholder="Correo electrónico" type="email" />
                    </div>
                    <div>
                    <label className="label-adm">Contraseña</label>
                    <input id="password-adm" name="password" placeholder="Contraseña" type="password" />
                    </div>
                    <button type="submit" className="boton-adm">Guardar</button>
                </form>
                </div>
            </div>
    </>
    )
}