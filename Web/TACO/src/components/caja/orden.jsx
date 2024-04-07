import React, { useEffect, useState } from "react";

import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
 
export const Orden =({idPedido, numMesa, mesa, personal, status}) => {
    const urlOrdenes = 'http://localhost:8081/api/Proyecto_Integrador/orden/pedidos';
    const urlPedidoAct = 'http://localhost:8081/api/Proyecto_Integrador/caja/actualizar';
    const [ ordenes, setOrdenes ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ cambio, setCambio ] = useState('');
    const [ compl, setCompl ] = useState(false);
   
    console.log("MESAORDENES");
    console.log(mesa);
    var total_a = 0;

    useEffect(() => {
        getOrdenes(); 
    }, [idPedido, numMesa]);
    
    const getOrdenes= async ()=>{
        let ordenes = [];
        if(idPedido != 0){
            await axios({
                method: 'POST',
                url: urlOrdenes,
                data: {
                    "pedidoBean": {
                        "idPedidos": idPedido
                    }
                }
              }).then(function (respuesta) {
                console.log(respuesta);
                if(status == false){
                    setOrdenes(respuesta.data.data);
                    //console.log("Ordenes");
                    ordenes = respuesta.data.data;
                    //console.log(ordenes);
                }                
              })
              .catch(function (error) {
                console.log(error);
              });

              if(ordenes != undefined || ordenes != null){
                
                for (let i = 0; i < ordenes.length; i++) {
                    const element = ordenes[i];
                    total_a = total_a + element.platilloBean.precio;
                }

                setTotal(total_a);
              }
        } else {
            setOrdenes([]);
            setTotal(0);
        }
    }

    const cobrarPedido = async () => {
        if(compl) {
            confirmCobrar();
        } else {
            Swal.fire('Error', 'El Dinero Ingresado no es suficiente.', 'error');
        }
    }

    const confirmCobrar = () => {
        const MySawl = withReactContent(Swal);

        MySawl.fire({ 
          title: 'Confirmar Cobrar',
          icon: 'question', text: '¿Seguro de Confirmar el Cobro?',
          showCancelButton: true, confirmButtonText: 'Cobrar', cancelButtonText: 'Cancelar'
        }).then((result) => {
          console.log("Cobrado a la mesa "+numMesa);
          actMesa();
        });
    }

    //idCaja, status_de_Pago, pedidoBean
    const actMesa = async () => {
        await axios({
            method: 'PUT',
            url: urlPedidoAct,
            data: {
                idCaja: mesa.idCaja,   
                status_de_Pago: true,
                pedidoBean: mesa.pedidoBean
            }
          }).then(function (respuesta) {
            console.log(respuesta);
            console.log(respuesta.status);
            Swal.fire({
                title: "Pedido cobrado",
                text: "Se ha cobrado el pedido",
                icon: "success"
              }).then((result) => {
                window.location.reload();
              });
              
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return(
        <>
            <div  className="container-pedido">
                <div className="num-orden">
                    <span>Orden </span>
                    <p>Mesa {numMesa}</p>
                </div>
                {ordenes != undefined ? 
                    ordenes.map((orden, i) => (
                <div key={i}>                
                    <div>
                        <p key={orden.idCaja}></p>

                        <div className="platillos">
                            <p>{orden.platilloBean.nombre}</p>
                            <p className="precio">${orden.platilloBean.precio}</p>
                        </div>
                    </div>                   
                </div>
                )) : <p></p> }
                
                <p>Total: &nbsp;&nbsp;${total}</p>

                <label>$&nbsp;&nbsp;
                    <input type="number" min={0} onChange={(e) => {
                        let recibo =  e.target.value;
                        if(total <= recibo){
                            setCambio('$'+Math.round(recibo - total));
                            setCompl(true);
                        } else {
                            setCambio('Dinero insuficiente');
                            setCompl(false);
                        }
                    }} />
                </label>
                <p>Cambio: {cambio}</p>
                <button className="cobrar-caja"  onClick={() => {cobrarPedido()} }>Cobrar</button>
            </div>

        </>
    )
}