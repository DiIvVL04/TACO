import React from "react";
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import Check from "../../../public/assets/imgs/check.png";
import Cross from "../../../public/assets/imgs/cross.png";
import { CocinaNavBar } from "./navBar";
export const InsumosCocina=()=>{
    return (
        <>
        <div className="mai-coc">
          <CocinaNavBar selected={2}/>
          <div className="container-table-cocina-coc">
            <div className="titulo-coc">
              <p> Leguminosas</p>
              
            </div>
            <table className='tabla-cocina-coc'>
              <thead>
                <tr>
                  <th className="th-coc">Producto</th>
                  <th className="th-coc">Cantidad</th>
                  <th className="th-coc">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-coc">Frijoles negros</td>
                  <td className="td-coc">2kg</td>
                  <td className="td-coc"><img src={Check} alt="check" /></td>
                </tr>
                <tr>
                  <td className="td-coc">Granos de maíz</td>
                  <td className="td-coc">0kg</td>
                  <td className="td-coc"><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td className="td-coc">Granos de maíz</td>
                  <td className="td-coc">0kg</td>
                  <td className="td-coc"><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td className="td-coc">Granos de maíz</td>
                  <td className="td-coc">0kg</td>
                  <td className="td-coc"><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td className="td-coc">Granos de maíz</td>
                  <td className="td-coc">0kg</td>
                  <td className="td-coc"><img src={Cross} alt="cross" /></td>
                </tr>
                <tr>
                  <td className="td-coc">Granos de maíz</td>
                  <td className="td-coc">0kg</td>
                  <td className="td-coc"><img src={Cross} alt="cross" /></td>
                </tr>
                
              </tbody>
            </table>
            <br />
          </div>
        </div>
          
        </>
      );
}