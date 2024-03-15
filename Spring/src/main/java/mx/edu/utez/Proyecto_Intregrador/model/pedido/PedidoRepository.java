package mx.edu.utez.Proyecto_Intregrador.model.pedido;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<PedidoBean, Long> {
}
