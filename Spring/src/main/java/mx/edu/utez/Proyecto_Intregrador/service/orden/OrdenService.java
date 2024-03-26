package mx.edu.utez.Proyecto_Intregrador.service.orden;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenRepository;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalRepository;
import mx.edu.utez.Proyecto_Intregrador.model.platillo.PlatilloRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class OrdenService {
    private final OrdenRepository repository;
    private final PersonalRepository personalRepository;
    private final PlatilloRepository platilloRepository;
    
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

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> obtenerPedidos(OrdenBean orden){
        List<OrdenBean> founOrden = repository.getPedidos(orden.getPedidoBean().getIdPedidos());
        if(!founOrden.isEmpty())
            return new ResponseEntity<>(new ApiResponse(repository.getPedidos(orden.getPedidoBean().getIdPedidos()), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Pedido no encontrado"), HttpStatus.BAD_REQUEST);

    }

    @Transactional(rollbackFor = {SQLException.class})
    public  ResponseEntity<ApiResponse> save(OrdenBean product){
        Optional<OrdenBean> foundProduct = repository.findById(product.getIdOrdenes());
        if (foundProduct.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Registro duplicado"), HttpStatus.BAD_REQUEST);
        }

        if (product.getPedidoBean() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se a Relacionado a ningun pedido"), HttpStatus.BAD_REQUEST);
        }if (product.getPlatilloBean() == null){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se a encontrado platillo"), HttpStatus.BAD_REQUEST);
            }

        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(product),HttpStatus.OK, "Guardado exitosamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public  ResponseEntity<ApiResponse> update(OrdenBean product){
        Optional<OrdenBean> foundProduct = repository.findById(product.getIdOrdenes());
        if (!foundProduct.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se encuentar la orden"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(product),HttpStatus.OK, "Acualizado exitozamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> delete(OrdenBean product){
        Optional<OrdenBean> foundProduct = repository.findById(product.getIdOrdenes());
        if(foundProduct.isPresent()) {
            repository.delete(product);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, true, "Orden Eliminada Correctamente"), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Orden No Encontrada"), HttpStatus.BAD_REQUEST);

        }
    }


}
