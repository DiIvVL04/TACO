package mx.edu.utez.Proyecto_Intregrador.model.orden;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenRepository extends JpaRepository<OrdenBean, Long> {

@Query(value = "SELECT * from ordenes inner join pedidos on ordenes.pedidos_fk = pedidos.id_pedidos where pedidos_fk=:pedidoId", nativeQuery = true)
    List<OrdenBean> getPedidos(@Param("pedidoId")Long pedidoID);

}
