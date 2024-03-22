import React from "react";
import './css/cocinaNavBar.css'
import './css/cocinaInsumos.css'
import Check from "../../../public/assets/imgs/check.png";
import Cross from "../../../public/assets/imgs/cross.png";
import { CocinaNavBar } from "./navBar";
export const InsumosCocina=()=>{
    return (
        <>
          <CocinaNavBar/>
          <div className="container-table">
            <p> Leguminosas</p>
            <table>
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
              </tbody>
            </table>
          </div>
        </>
      );
}