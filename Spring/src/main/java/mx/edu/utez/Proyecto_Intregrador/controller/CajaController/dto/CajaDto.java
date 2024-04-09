package mx.edu.utez.Proyecto_Intregrador.controller.CajaController.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.model.caja.CajaBean;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;

@NoArgsConstructor
@Data
public class CajaDto {
    private Long idCaja;
    private PedidoBean pedidoBean;
    private boolean status_de_Pago;

    public CajaBean toEntity(){return new CajaBean(idCaja,status_de_Pago,pedidoBean);}
}
