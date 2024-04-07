package mx.edu.utez.Proyecto_Intregrador.controller.OrdenController.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloBean;

@NoArgsConstructor
@Data
public class OrdenDto {
    private Long idOrdenes;
    private PedidoBean pedidoBean;
    private PlatilloBean platilloBean;
    private boolean status;

    public OrdenBean toEntity(){
        return new OrdenBean(idOrdenes,status, platilloBean , pedidoBean);
    }

    public OrdenBean toEntity2(){
        return new OrdenBean(idOrdenes);
    }
}


