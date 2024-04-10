package mx.edu.utez.Proyecto_Intregrador.model.caja;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CajaRepository extends JpaRepository<CajaBean, Long> {
}
