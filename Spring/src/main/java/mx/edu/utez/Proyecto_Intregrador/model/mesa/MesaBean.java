package mx.edu.utez.Proyecto_Intregrador.model.mesa;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;

import java.util.Set;

@Entity
@Table(name = "mesas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MesaBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMesas;
    @Column(nullable = false)
    private int numero;
    @Column(nullable = false)
    private boolean estado;

    @OneToMany(mappedBy = "mesaBean", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<PedidoBean> pedidoBean;


    public MesaBean(int numero, boolean estado) {
        this.numero = numero;
        this.estado = estado;
    }

    public MesaBean(Long idMesas) {
        this.idMesas = idMesas;
    }

    public MesaBean(Long idMesas, int numero, boolean estado) {
        this.idMesas = idMesas;
        this.numero = numero;
        this.estado = estado;
    }
}
