package mx.edu.utez.Proyecto_Intregrador.model.pedido;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Proyecto_Intregrador.model.caja.CajaBean;
import mx.edu.utez.Proyecto_Intregrador.model.mesa.MesaBean;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;

import java.util.Set;

@Entity
@Table (name = "pedidos")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedidos;

    @Column(nullable = false)
    private boolean statusP;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mesas_fk", nullable = false)
    private MesaBean mesaBean;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "personal_fk", nullable = false)
    private PersonalBean personalBean;

    @JsonIgnore
    @OneToMany(mappedBy = "pedidoBean", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<CajaBean> cajaBeans;

    @JsonIgnore
    @OneToMany(mappedBy = "pedidoBean", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<OrdenBean> ordenBean;

    public PedidoBean(Long idPedidos, boolean status, MesaBean mesaBean, PersonalBean personalBean) {
        this.idPedidos = idPedidos;
        this.statusP = status;
        this.mesaBean = mesaBean;
        this.personalBean = personalBean;
    }


}
