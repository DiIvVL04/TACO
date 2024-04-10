package mx.edu.utez.Proyecto_Intregrador.controller.CajaController;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.controller.CajaController.dto.CajaDto;
import mx.edu.utez.Proyecto_Intregrador.service.caja.CajaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Proyecto_Integrador/caja")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class CajaController {

    private final CajaService service;

    @GetMapping("/obtener")
    public ResponseEntity<ApiResponse> visualizar(){
        return service.getAll();
    }

    @PostMapping("/obtenerUno")
    public ResponseEntity<ApiResponse> visualizarId(@RequestBody CajaDto dto){
        return service.obtenerId(dto.toEntity());
    }
    @PostMapping("/guardar")
    public ResponseEntity<ApiResponse> guardarUno(@RequestBody CajaDto dto){
        return service.save(dto.toEntity());
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ApiResponse> update(@RequestBody CajaDto dto){
        return service.update(dto.toEntity());
    }

    @DeleteMapping("/borrar")
    public ResponseEntity<ApiResponse> delete(@RequestBody CajaDto dto){
        return service.delete(dto.toEntity());
    }

}
