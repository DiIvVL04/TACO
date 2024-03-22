import './css/cajaNavBar.css'
import './css/cajaConfig.css'
import React from 'react'
import User from '../../../public/assets/imgs/user.png'
import { NavBarCaja } from './navbar'
export const ConfigCaja=()=>{
    return(
        <>
            <NavBarCaja/>
            <div className="container-user">
                <div className="container_imagen">
                <img src={User} alt="User" />
                </div>
                <div className="container_formulario">
                <form>
                    <div>
                    <label htmlFor="usuario" className="usuario">Usuario</label>
                    <input id="usuario-caja" name="usuario" placeholder="Usuario" />
                    </div>
                    <div>
                    <label htmlFor="email" className="email">Correo electrónico</label>
                    <input id="email-caja" name="email" placeholder="Correo electrónico" type="email" />
                    </div>
                    <div>
                    <label htmlFor="password" className="password">Contraseña</label>
                    <input id="password-caja" name="password" placeholder="Contraseña" type="password" />
                    </div>
                    <button type="submit" className="boton-caja">Guardar</button>
                </form>
                </div>
            </div>
    </>
    )
}