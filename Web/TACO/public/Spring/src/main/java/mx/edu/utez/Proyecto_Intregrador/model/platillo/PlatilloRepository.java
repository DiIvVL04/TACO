package mx.edu.utez.Proyecto_Intregrador.model.platillo;

import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlatilloRepository extends JpaRepository<PlatilloBean, Long> {
    Optional<PlatilloBean> findByNombre(String nombre);


}
