package mx.edu.utez.Proyecto_Intregrador.model.pedido;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Proyecto_Intregrador.model.caja.CajaBean;
import mx.edu.utez.Proyecto_Intregrador.model.mesa.MesaBean;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mesas_fk", nullable = false)
    private MesaBean mesaBean;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "personal_fk", nullable = false)
    private PersonalBean personalBean;

    @OneToMany(mappedBy = "pedidoBean")
    private Set<CajaBean> cajaBeans;

    public PedidoBean(Long idPedidos, MesaBean mesaBean, PersonalBean personalBean) {
        this.idPedidos = idPedidos;
        this.mesaBean = mesaBean;
        this.personalBean = personalBean;
    }
}
