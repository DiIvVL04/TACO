package mx.edu.utez.Proyecto_Intregrador.model.mesa;

import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MesaRepository extends JpaRepository<MesaBean, Long> {

    Optional<MesaBean> findByNumero(int numero);

}
