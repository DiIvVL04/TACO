package mx.edu.utez.Proyecto_Intregrador.model.caja;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;


@Entity
@Table(name = "caja")
@Getter
@Setter
@NoArgsConstructor
public class CajaBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCaja;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordenes_fk", nullable = false)
    private OrdenBean ordenBean;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedidos_fk", nullable = false)
    private PedidoBean pedidoBean;

    public CajaBean(Long idCaja, OrdenBean ordenBean, PedidoBean pedidoBean) {
        this.idCaja = idCaja;
        this.ordenBean = ordenBean;
        this.pedidoBean = pedidoBean;
    }
}
