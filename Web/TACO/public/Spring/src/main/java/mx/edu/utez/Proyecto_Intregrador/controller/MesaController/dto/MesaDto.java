package mx.edu.utez.Proyecto_Intregrador.controller.MesaController.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.model.mesa.MesaBean;

@NoArgsConstructor
@Data
public class MesaDto {
    private Long id_mesas;
    private int numero;
    private boolean estado;

    public MesaBean toEntity(){
        return new MesaBean(numero, estado);
    }

    public MesaBean toEntity2(){
        return new MesaBean(id_mesas);
    }

    public MesaBean toEntity3(){
        return new MesaBean(id_mesas, numero, estado);
    }
}
