package mx.edu.utez.Proyecto_Intregrador.model.orden;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Proyecto_Intregrador.model.caja.CajaBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloBean;

import java.util.Set;

@Entity
@Table (name = "ordenes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrdenBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOrdenes;
    @Column(nullable = false)
    private boolean status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "platillos_fk",nullable = false)
    private PlatilloBean platilloBean;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "personal_fk", nullable = false)
    private PersonalBean personalBean;

    @OneToMany(mappedBy = "ordenBean", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<CajaBean> cajaBean;

    public OrdenBean(boolean status, PlatilloBean platilloBean, PersonalBean personalBean) {
        this.status = status;
        this.platilloBean = platilloBean;
        this.personalBean = personalBean;
    }


    public OrdenBean(Long idOrdenes, boolean status, PlatilloBean platilloBean, PersonalBean personalBean) {
        this.idOrdenes = idOrdenes;
        this.status = status;
        this.platilloBean = platilloBean;
        this.personalBean = personalBean;
    }

    public OrdenBean(Long idOrdenes) {
        this.idOrdenes = idOrdenes;
    }
}
