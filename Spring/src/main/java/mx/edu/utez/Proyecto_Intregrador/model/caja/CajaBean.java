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

    @Column(nullable = false)
    private boolean status_de_Pago;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pedidos_fk", nullable = false)
    private PedidoBean pedidoBean;

    public CajaBean(Long idCaja, boolean status_de_Pago, PedidoBean pedidoBean) {
        this.idCaja = idCaja;
        this.status_de_Pago = status_de_Pago;
        this.pedidoBean = pedidoBean;
    }
}
