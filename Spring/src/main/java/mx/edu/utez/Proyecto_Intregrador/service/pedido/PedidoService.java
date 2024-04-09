package mx.edu.utez.Proyecto_Intregrador.service.pedido;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.model.caja.CajaBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class PedidoService {

    private final PedidoRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> obtenerId(PedidoBean pedido){
        Optional<PedidoBean> foundMesa = repository.findById(pedido.getIdPedidos());
        if(foundMesa.isPresent())
            return new ResponseEntity<>(new ApiResponse(repository.findById(pedido.getIdPedidos()), HttpStatus.OK, "Todo Bien"), HttpStatus.OK);

        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Pedido no encontrado"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(PedidoBean pedido){
        Optional<PedidoBean> foundMesa = repository.findById(pedido.getIdPedidos());
        if(foundMesa.isPresent())
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Pedido Duplicado"), HttpStatus.BAD_REQUEST);
        if (pedido.getMesaBean() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se a encontrado el pedido"), HttpStatus.BAD_REQUEST);
        }if (pedido.getPersonalBean() == null){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se a encontrado el mesero"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(pedido), HttpStatus.OK, "Pedido Registrado Correctamente"), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update (PedidoBean pedido){
        Optional<PedidoBean> foundMesa = repository.findById(pedido.getIdPedidos());
        if(foundMesa.isPresent())

            return new ResponseEntity<>(
                    new ApiResponse(repository.saveAndFlush(pedido), HttpStatus.OK,
                            "Actualizacion hecha en el pedido"), HttpStatus.OK);
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "No se encontro el pedido"), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> delete (PedidoBean pedido){
        Optional<PedidoBean> foundMesa = repository.findById(pedido.getIdPedidos());
        if(foundMesa.isPresent()) {
            repository.delete(pedido);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, true, "Pedido eliminado"), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "pedido no encontrado"), HttpStatus.BAD_REQUEST);
        }
    }
}
