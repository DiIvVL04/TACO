package mx.edu.utez.Proyecto_Intregrador.controller.OrdenController.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloBean;

@NoArgsConstructor
@Data
public class OrdenDto {
    private Long idOrden;
    private PersonalBean personalBean;
    private PlatilloBean platilloBean;
    private boolean status;

    public OrdenBean toEntity(){
        return new OrdenBean(status, platilloBean , personalBean);
    }

    public OrdenBean toEntity2(){
        return new OrdenBean(idOrden);
    }

}


