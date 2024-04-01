package mx.edu.utez.Proyecto_Intregrador.controller.PedidoController.dto;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.model.mesa.MesaBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;

@NoArgsConstructor
@Data
public class PedidoDto {
    private Long idPedidos;
    private MesaBean mesaBean;
    private PersonalBean personalBean;
    private boolean status;

    public PedidoBean toEntity(){ return new PedidoBean(idPedidos,status,mesaBean,personalBean);}
}
