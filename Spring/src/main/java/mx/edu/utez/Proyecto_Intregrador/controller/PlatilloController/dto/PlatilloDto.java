package mx.edu.utez.Proyecto_Intregrador.controller.PlatilloController.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloBean;

@NoArgsConstructor
@Data
public class PlatilloDto {
    private Long idPlatillos;
    private String nombre;
    private String descripcion;
    private int stock;
    private String tipo;
    private double precio;
    private boolean status;

    public PlatilloBean toEntity(){
        return new PlatilloBean(nombre, descripcion,stock, tipo, precio,status);
    }

    public PlatilloBean toEntity2(){
        return new PlatilloBean(idPlatillos);
    }

    public PlatilloBean toEntity3(){
        return new PlatilloBean(idPlatillos,nombre, descripcion,stock, tipo, precio,status);
    }


}
