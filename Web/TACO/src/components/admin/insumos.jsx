import { useEffect } from 'react';
import React from 'react';
import './css/adminNavBar.css'
import './css/adminInsumos.css'
import Check from "../../../public/assets/imgs/check.png";
import Cross from "../../../public/assets/imgs/cross.png";
import { NavBarAdmin } from './navbar';

export const InsumosAdmin=()=>{
    useEffect(() => {
        function agregar() {
          console.log('Agregar');
        }
    
        function modificar() {
          console.log('Modificar');
        }
    
        function eliminar() {
          console.log('Eliminar');
        }
    
        document.querySelector('.agregar').addEventListener('click', agregar);
        document.querySelector('.modificar').addEventListener('click', modificar);
        document.querySelector('.eliminar').addEventListener('click', eliminar);
    
        return () => {
          document.querySelector('.agregar').removeEventListener('click', agregar);
          document.querySelector('.modificar').removeEventListener('click', modificar);
          document.querySelector('.eliminar').removeEventListener('click', eliminar);
        };
      }, []);
    
      return (
        <>
          <NavBarAdmin/>
          <div className="container-table-admin">
            <div className="titulo">
              <p> Leguminosas</p>
              <div className="botones">
                <button className="agregar">Agregar</button>
                <button className="modificar">Modificar</button>
                <button className="eliminar">Eliminar</button>
              </div>
            </div>
            <table className='tabla-admin'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frijoles negros</td>
                  <td>2kg</td>
                  <td><img src={Check} alt="check" /></td>
                </tr>
                <tr>
                  <td>Granos de maíz</td>
                  <td>0kg</td>
                  <td><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td>Granos de maíz</td>
                  <td>0kg</td>
                  <td><img src={Cross} alt="cross" /></td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
          
        </>
      )
}