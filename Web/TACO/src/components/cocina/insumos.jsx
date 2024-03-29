import React, { useEffect, useState } from "react";
import './css/cocinaNavBar.css'
import './css/cocinaBody.css'
import Check from "../../../public/assets/imgs/check.png";
import Cross from "../../../public/assets/imgs/cross.png";
import { CocinaNavBar } from "./navBar";
import axios from 'axios';
export const InsumosCocina=()=>{
  const urlPlatillos = 'http://localhost:8081/api/Proyecto_Integrador/platillo/';
  const [ platillos, setPlatillos ] = useState([]);
  useEffect(() => {
    getPlatillos();
  }, []);

  const getPlatillos = async () => {
    const respuesta = await axios.get(urlPlatillos+'obtener');
    setPlatillos(respuesta.data.data);
    console.log(respuesta.data.data);
  }
    return ( 
        <>
        <div className="main-coc">
          <CocinaNavBar selected={2}/>
          <div className="container-table-cocina-coc">
            <div className="titulo-coc">
              <span> Platillos disponibles</span>

            </div>
            <table className='tabla-cocina-coc'>
            <thead>
                <tr>
                  <th className="th-coc">Platillo</th>
                  <th className="th-coc">Tipo</th>
                  <th className="th-coc">Stock</th>
                  <th className="th-coc">Estado</th>      
                </tr>
              </thead>
              <tbody>
                {platillos.map((platillo, i) => (
                  <tr key={i}>
                    <td className="td-coc">{platillo.nombre}</td>
                    <td className="td-coc">{platillo.tipo}</td>
                    <td className="td-coc">{platillo.stock}</td>
                    {platillo.status ? (
                      <td className="td-coc"><img src={Check} alt="check" /></td>
                    ) : (
                      <td className="td-coc"><img src={Cross} alt="check" /></td>
                    )}
                  </tr>
                ))}                
              </tbody>
            </table>
            <br />
          </div>
        </div>
          
        </>
      );
}