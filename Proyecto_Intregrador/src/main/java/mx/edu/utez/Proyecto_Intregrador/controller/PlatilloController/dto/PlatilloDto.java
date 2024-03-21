package mx.edu.utez.Proyecto_Intregrador.controller.PlatilloController.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloBean;

@NoArgsConstructor
@Data
public class PlatilloDto {
    private Long idPlatillo;
    private String nombre;
    private String descripcion;
    private String tipo;
    private double precio;

    public PlatilloBean toEntity(){
        return new PlatilloBean(nombre, descripcion, tipo, precio);
    }

    public PlatilloBean toEntity2(){
        return new PlatilloBean(idPlatillo);
    }

    public PlatilloBean toEntity3(){
        return new PlatilloBean(idPlatillo, nombre, descripcion, tipo, precio);
    }


}
