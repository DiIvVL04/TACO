import { useEffect } from 'react';
import './css/adminNavBar.css'
import './css/adminMesas.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import Sumar from "../../../public/assets/imgs/sumar.png"
import React from 'react';
import { NavBarAdmin } from './navbar';

export const MesasAdmin=()=>{
    useEffect(() => {
        function agregarMesa() {
          const nuevasMesas = document.querySelectorAll('.mesa_container').length;
          const nuevaMesa = document.createElement('div');
          nuevaMesa.classList.add('mesa_container');
          nuevaMesa.innerHTML = `
            <p> Mesa ${nuevasMesas}</p>
            <img src="${Mesa}"/>
            <div class="mesa_container_botones">
              <button class="administrar">Administrar</button>
            </div>`;
          const agregarMesaElement = document.getElementById('agregarMesa');
          agregarMesaElement.parentNode.insertBefore(nuevaMesa, agregarMesaElement); //agrega a la izquierda del sumar
        }
    
        document.getElementById('agregarMesa').addEventListener('click', agregarMesa);
    
        return () => {
          document.getElementById('agregarMesa').removeEventListener('click', agregarMesa);
        };
      }, []);

      return(
        <>
            <NavBarAdmin/>
            <div className="container-para-mesas">
                <div className="container_mesas">
                <div className="mesa_container">
                    <p> Mesa 1</p>
                    <img src={Mesa} alt="Mesa" />
                    <div className="mesa_container_botones">
                    <button className="administrar">Administrar</button>
                    </div>  
                </div>
                <div className="mesa_container" id="agregarMesa">
                    <img src={Sumar} alt="Sumar" />
                    <p> Agregar mesa</p>
                </div>  
                </div>
                <div className="container_pedido">

                </div>
            </div>
        </>
      )
}