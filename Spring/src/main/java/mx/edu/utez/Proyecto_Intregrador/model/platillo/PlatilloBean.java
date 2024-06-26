package mx.edu.utez.Proyecto_Intregrador.model.platillo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;

import java.util.Set;

@Entity
@Table (name = "platillos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlatilloBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPlatillos;
    @Column(nullable = false, length = 45)
    private String nombre;
    @Column(nullable = false, length = 255)
    private String descripcion;
    @Column(nullable = false)
    private int stock;
    @Column(nullable = false, length = 15)
    private String tipo;
    @Column(nullable = false)
    private Double precio;
    @Column(nullable = false)
    private Boolean status;

    @JsonIgnore
    @OneToMany(mappedBy = "platilloBean", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<OrdenBean> ordenBeans;

    public PlatilloBean(String nombre, String descripcion, int stock, String tipo, Double precio, Boolean status) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = stock;
        this.tipo = tipo;
        this.precio = precio;
        this.status = status;
    }

    public PlatilloBean(Long idPlatillos) {
        this.idPlatillos = idPlatillos;
    }

    public PlatilloBean(Long idPlatillos, String nombre, String descripcion, int stock, String tipo, Double precio, Boolean status) {
        this.idPlatillos = idPlatillos;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = stock;
        this.tipo = tipo;
        this.precio = precio;
        this.status = status;
    }
}
