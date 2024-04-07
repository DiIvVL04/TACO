package mx.edu.utez.Proyecto_Intregrador.controller.PedidoController;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.controller.CajaController.dto.CajaDto;
import mx.edu.utez.Proyecto_Intregrador.controller.PedidoController.dto.PedidoDto;
import mx.edu.utez.Proyecto_Intregrador.service.pedido.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Proyecto_Integrador/pedido")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PedidoController {

    private final PedidoService service;

    @GetMapping("/obtener")
    public ResponseEntity<ApiResponse> visualizar(){
        return service.getAll();
    }

    @PostMapping("/obtenerUno")
    public ResponseEntity<ApiResponse> visualizarId(@RequestBody PedidoDto dto){
        return service.obtenerId(dto.toEntity());
    }
    @PostMapping("/guardar")
    public ResponseEntity<ApiResponse> guardarUno(@RequestBody PedidoDto dto){
        return service.save(dto.toEntity());
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ApiResponse> update(@RequestBody PedidoDto dto){
        return service.update(dto.toEntity());
    }

    @DeleteMapping("/borrar")
    public ResponseEntity<ApiResponse> delete(@RequestBody PedidoDto dto){
        return service.delete(dto.toEntity());
    }

}
