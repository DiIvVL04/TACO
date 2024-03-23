import './css/cajaNavBar.css'
import './css/cajaBody.css'
import React from 'react'
import User from '../../../public/assets/imgs/user.png'
import { NavBarCaja } from './navbar'
export const ConfigCaja=()=>{
    return(
        <>
            <NavBarCaja/>
            <div className="container-user-caja">
                <div className="container_imagen-caja">
                <img src={User} alt="User" />
                </div>
                <div className="container_formulario-caja">
                <form>
                    <div>
                    <label className="label-caja">Usuario</label>
                    <input id="usuario-caja" name="usuario" placeholder="Usuario" />
                    </div>
                    <div>
                    <label className="label-caja">Correo electrónico</label>
                    <input id="email-caja" name="email" placeholder="Correo electrónico" type="email" />
                    </div>
                    <div>
                    <label className="label-caja">Contraseña</label>
                    <input id="password-caja" name="password" placeholder="Contraseña" type="password" />
                    </div>
                    <button type="submit" className="boton-caja">Guardar</button>
                </form>
                </div>
            </div>
    </>
    )
}