package mx.edu.utez.Proyecto_Intregrador.service.personal;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class PersonalService {
    private final PersonalRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);

    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(PersonalBean personal){
        Optional<PersonalBean> founPersonal = repository.findByNombre(personal.getNombre());
        if(founPersonal.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Regsitro de Personal Duplicado"), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(personal), HttpStatus.OK, "Personal Registrado Correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> obtenerId(PersonalBean personal){
        Optional<PersonalBean> foundPersonal = repository.findById(personal.getIdPersonal());
        if(foundPersonal.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.findById(personal.getIdPersonal()), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Registro de Personal no encontrado"), HttpStatus.BAD_REQUEST);

    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> loginUsuario(PersonalBean personal){
        Optional<PersonalBean> foundPersonal = repository.findByUsernameAndAndPassword(personal.getUsername(), personal.getPassword());
        if(foundPersonal.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.findByUsernameAndAndPassword(personal.getUsername(), personal.getPassword()), HttpStatus.OK, "Bienvenido"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Error al iniciar sesion"), HttpStatus.BAD_REQUEST);

    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(PersonalBean personal){
        Optional<PersonalBean> foundPersonal = repository.findById(personal.getIdPersonal());
        if(foundPersonal.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(personal), HttpStatus.OK, "Personal Actualziado Correctamente"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Personal No Encontrado"), HttpStatus.BAD_REQUEST);

    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> delete(PersonalBean personal){
        Optional<PersonalBean> foundPersonal = repository.findById(personal.getIdPersonal());
        if(foundPersonal.isPresent()) {
            repository.delete(personal);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, true, "Personal Eliminado Correctamente"), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Personal No Encontrado"), HttpStatus.BAD_REQUEST);

        }
    }

}
