package mx.edu.utez.Proyecto_Intregrador.service.platillo;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloBean;
import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class PlatilloService {
    private final PlatilloRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(),HttpStatus.OK, "Todo Bien"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> obtenerId(PlatilloBean platillo){
        Optional<PlatilloBean> foundPlatillo = repository.findById(platillo.getIdPlatillos());
        if(foundPlatillo.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.findById(platillo.getIdPlatillos()), HttpStatus.OK, "Todo Bien"),HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Regsitro No Encontrado"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(PlatilloBean platillo){
        Optional<PlatilloBean> founPlatillo = repository.findByNombre(platillo.getNombre());
        if(founPlatillo.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Platillo Duplicado"),HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(platillo),HttpStatus.OK, "Platillo Registrado Correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(PlatilloBean platillo){
        Optional<PlatilloBean> foundPlatillo = repository.findById(platillo.getIdPlatillos());
        if(foundPlatillo.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(platillo), HttpStatus.OK, "Platillo Actualizado Correctamente"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Platillo No Encontrado"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> delete(PlatilloBean platillo){
        Optional<PlatilloBean> founPlatillo = repository.findById(platillo.getIdPlatillos());
        if(founPlatillo.isPresent()){
            repository.delete(platillo);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, true, "Platillo Eliminado Correctamente"), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Platillo No Encontrado"), HttpStatus.BAD_REQUEST);
        }
    }
}
