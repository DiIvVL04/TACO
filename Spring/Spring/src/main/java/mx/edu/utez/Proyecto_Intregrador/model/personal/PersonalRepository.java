package mx.edu.utez.Proyecto_Intregrador.model.personal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalRepository extends JpaRepository<PersonalBean, Long> {
    Optional<PersonalBean> findByNombre(String nombre);

    Optional<PersonalBean> findByUsernameAndAndPassword (String username, String password);

    Optional<PersonalBean> findFirstByUsername(String username);
}
