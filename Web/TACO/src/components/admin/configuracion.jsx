import './css/adminNavBar.css'
import './css/adminConfig.css'
import React from 'react'

import User from '../../../public/assets/imgs/user.png'
import { NavBarAdmin } from './navbar'
export const ConfiguracionAdmin=()=>{
    return(
        <>
            <NavBarAdmin/>
            <div className="container-user">
                <div className="container_imagen">
                <img src={User} alt="User" />
                </div>
                <div className="container_formulario">
                <form>
                    <div>
                    <label htmlFor="usuario" className="usuario">Usuario</label>
                    <input id="usuario-ad" name="usuario" placeholder="Usuario" />
                    </div>
                    <div>
                    <label htmlFor="email" className="email">Correo electrónico</label>
                    <input id="email-ad" name="email" placeholder="Correo electrónico" type="email" />
                    </div>
                    <div>
                    <label htmlFor="password" className="password">Contraseña</label>
                    <input id="password-ad" name="password" placeholder="Contraseña" type="password" />
                    </div>
                    <button type="submit" className="boton-adm">Guardar</button>
                </form>
                </div>
            </div>
    </>
    )
}