package mx.edu.utez.Proyecto_Intregrador.controller.OrdenController;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.controller.OrdenController.dto.OrdenDto;
import mx.edu.utez.Proyecto_Intregrador.service.orden.OrdenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Proyecto_Integrador/orden")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class OrdenController {
    private final OrdenService service;

    @GetMapping("/obtener")
    public ResponseEntity<ApiResponse> visualizar(){
        return service.getAll();
    }

    @PostMapping("/obtenerUno")
    public ResponseEntity<ApiResponse> visualizarId(@RequestBody OrdenDto dto){
        return service.obtenerId(dto.toEntity2());
    }
    @PostMapping("/guardar")
    public ResponseEntity<ApiResponse> guardarUno(@RequestBody OrdenDto dto){
        return service.save(dto.toEntity());
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ApiResponse> update(@RequestBody OrdenDto dto){
        return service.update(dto.toEntity());
    }

    @DeleteMapping("/borrar")
    public ResponseEntity<ApiResponse> delete(@RequestBody OrdenDto dto){
        return service.delete(dto.toEntity2());
    }

    @PostMapping("/pedidos")
    public  ResponseEntity<ApiResponse>obtenerPedidos(@RequestBody OrdenDto dto){
        return service.obtenerPedidos(dto.toEntity());
    }
}
