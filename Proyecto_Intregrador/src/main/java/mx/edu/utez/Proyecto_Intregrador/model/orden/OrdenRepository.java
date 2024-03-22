package mx.edu.utez.Proyecto_Intregrador.model.orden;

import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrdenRepository extends JpaRepository<OrdenBean, Long> {


}
