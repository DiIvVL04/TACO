package mx.edu.utez.Proyecto_Intregrador.controller.CajaController.dto;

import mx.edu.utez.Proyecto_Intregrador.model.caja.CajaBean;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;

public class CajaDto {
    private Long idCaja;
    private OrdenBean ordenBean;
    private PedidoBean pedidoBean;

    public CajaBean toEntity(){return new CajaBean(idCaja,ordenBean,pedidoBean);}
}
