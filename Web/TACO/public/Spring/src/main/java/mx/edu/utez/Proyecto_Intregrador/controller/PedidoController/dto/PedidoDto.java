package mx.edu.utez.Proyecto_Intregrador.controller.PedidoController.dto;
import mx.edu.utez.Proyecto_Intregrador.model.mesa.MesaBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;

public class PedidoDto {
    private Long idPedidos;
    private MesaBean mesaBean;
    private PersonalBean personalBean;

    public PedidoBean toEntity(){ return new PedidoBean(idPedidos,mesaBean,personalBean);}
}
