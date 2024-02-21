package mx.edu.utez.Proyecto_Intregrador.service.orden;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class OrdenService {
    private final OrdenRepository repository;
    
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> obtenerId(OrdenBean orden){
        Optional<OrdenBean> founOrden = repository.findById(orden.getIdOrdenes());
        if(founOrden.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.findById(orden.getIdOrdenes()), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Orden No Encontrada"), HttpStatus.BAD_REQUEST);

    }


}
