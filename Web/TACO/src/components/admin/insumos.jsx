import { useEffect } from 'react';
import React from 'react';
import './css/adminNavBar.css'
import './css/adminBody.css'
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
     
        document.querySelector('.agregar-adm').addEventListener('click', agregar);
        document.querySelector('.modificar-adm').addEventListener('click', modificar);
        document.querySelector('.eliminar-adm').addEventListener('click', eliminar);
    
        return () => {
          document.querySelector('.agregar-adm').removeEventListener('click', agregar);
          document.querySelector('.modificar-adm').removeEventListener('click', modificar);
          document.querySelector('.eliminar-adm').removeEventListener('click', eliminar);
        };
      }, []);
    
      return (
        <>
        <div className="main-adm">
        <NavBarAdmin/>
          <div className="container-table-admin-adm">
            <div className="titulo-adm">
              <p> Leguminosas</p>
              <div className="botones-adm">
                <button className="agregar-adm">Agregar</button>
                <button className="modificar-adm">Modificar</button>
                <button className="eliminar-adm">Eliminar</button>
              </div>
            </div>
            <table className='tabla-admin-adm'>
            <thead>
                <tr>
                  <th className="th-adm">Producto</th>
                  <th className="th-adm">Cantidad</th>
                  <th className="th-adm">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-adm">Frijoles negros</td>
                  <td className="td-adm">2kg</td>
                  <td className="td-adm"><img src={Check} alt="check" /></td>
                </tr>
                <tr>
                  <td className="td-adm">Granos de maíz</td>
                  <td className="td-adm">0kg</td>
                  <td className="td-adm"><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td className="td-adm">Granos de maíz</td>
                  <td className="td-adm">0kg</td>
                  <td className="td-adm"><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td className="td-adm">Granos de maíz</td>
                  <td className="td-adm">0kg</td>
                  <td className="td-adm"><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td className="td-adm">Granos de maíz</td>
                  <td className="td-adm">0kg</td>
                  <td className="td-adm"><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td className="td-adm">Granos de maíz</td>
                  <td className="td-adm">0kg</td>
                  <td className="td-adm"><img src={Cross} alt="cross" /></td>
                </tr>
                
              </tbody>
            </table>
            <br />
          </div>
        </div>
          
          
        </>
      )
}