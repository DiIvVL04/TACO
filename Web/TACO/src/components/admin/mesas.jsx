import { useEffect } from 'react';
import './css/adminNavBar.css'
import './css/adminBody.css'
import Mesa from "../../../public/assets/imgs/mesa.png"
import Sumar from "../../../public/assets/imgs/sumar.png"
import React from 'react';
import { NavBarAdmin } from './navbar';

export const MesasAdmin=()=>{
    useEffect(() => {
        function agregarMesa() {
          const nuevasMesas = document.querySelectorAll('.mesa_container-adm').length;
          const nuevaMesa = document.createElement('div');
          nuevaMesa.classList.add('mesa_container-adm');
          nuevaMesa.innerHTML = `
            <p> Mesa ${nuevasMesas}</p>
            <img src="${Mesa}"/>
            <div class="mesa_container_botones-adm">
              <button class="administrar-adm">Administrar</button>
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
            <div className="container-para-mesas-adm">
                <div className="container_mesas-adm">
                <div className="mesa_container-adm">
                    <p> Mesa 1</p>
                    <img src={Mesa} alt="Mesa" />
                    <div className="mesa_container_botones-adm">
                    <button className="administrar-adm">Administrar</button>
                    </div>  
                </div>
                <div className="mesa_container-adm" id="agregarMesa">
                    <img src={Sumar} alt="Sumar" />
                    <p> Agregar mesa</p>
                </div>  
                </div>
                <div className="container_pedido-adm">

                </div>
            </div>
        </>
      )
}