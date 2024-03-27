package mx.edu.utez.Proyecto_Intregrador.service.caja;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.model.caja.CajaBean;
import mx.edu.utez.Proyecto_Intregrador.model.caja.CajaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class CajaService {
    private final CajaRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> obtenerId(CajaBean caja){
        Optional<CajaBean> foundMesa = repository.findById(caja.getIdCaja());
        if(foundMesa.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.findById(caja.getIdCaja()), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Caja No Encontrada"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(CajaBean caja){
        Optional<CajaBean> foundMesa = repository.findById(caja.getIdCaja());
        if(foundMesa.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Caja Duplicada"), HttpStatus.BAD_REQUEST);
        if (caja.getPedidoBean() == null){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se a encontrado la caja"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(caja), HttpStatus.OK, "caja Registarda Correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update (CajaBean caja){
        Optional<CajaBean> foundMesa = repository.findById(caja.getIdCaja());
        if(foundMesa.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(caja), HttpStatus.OK, "Actualizacion hecha en caja"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se encontro la caja"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> delete (CajaBean caja){
        Optional<CajaBean> foundMesa = repository.findById(caja.getIdCaja());
        if(foundMesa.isPresent()) {
            repository.delete(caja);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, true, "Caja eliminado"), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Caja no encontrada"), HttpStatus.BAD_REQUEST);
        }
    }
}
