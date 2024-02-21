package mx.edu.utez.Proyecto_Intregrador.service.mesa;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.model.mesa.MesaBean;
import mx.edu.utez.Proyecto_Intregrador.model.mesa.MesaRepository;
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
public class MesaService {
    private final MesaRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> obtenerId(MesaBean mesa){
        Optional<MesaBean> foundMesa = repository.findById(mesa.getIdMesas());
        if(foundMesa.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.findById(mesa.getIdMesas()), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Mesa No Encontrada"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(MesaBean mesa){
        Optional<MesaBean> foundMesa = repository.findByNumero(mesa.getNumero());
        if(foundMesa.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Mesa Duplicada"), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(mesa), HttpStatus.OK, "Mesa Registarda Correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update (MesaBean mesa){
        Optional<MesaBean> foundMesa = repository.findById(mesa.getIdMesas());
        if(foundMesa.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(mesa), HttpStatus.OK, "Mesa Actualziada"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Mesa No Encontrada"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> delete (MesaBean mesa){
        Optional<MesaBean> founMesa = repository.findById(mesa.getIdMesas());
        if(founMesa.isPresent()) {
            repository.delete(mesa);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, true, "Mesa Eliminada Con Exito"), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Mesa No Encontrada"), HttpStatus.BAD_REQUEST);
        }
    }


}
