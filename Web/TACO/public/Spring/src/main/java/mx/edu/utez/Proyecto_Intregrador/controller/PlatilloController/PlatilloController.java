package mx.edu.utez.Proyecto_Intregrador.controller.PlatilloController;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.controller.PlatilloController.dto.PlatilloDto;
import mx.edu.utez.Proyecto_Intregrador.service.platillo.PlatilloService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Proyecto_Integrador/platillo")
@CrossOrigin("*")
@AllArgsConstructor
public class PlatilloController {
    private final PlatilloService service;

    @GetMapping("/obtener")
    public ResponseEntity<ApiResponse> visualizar(){
        return service.getAll();
    }

    @PostMapping("/ObtenerUno")
    public ResponseEntity<ApiResponse> visualziarId(@RequestBody PlatilloDto dto){
        return service.obtenerId(dto.toEntity2());
    }

    @PostMapping("/guardar")
    public ResponseEntity<ApiResponse> register(@RequestBody PlatilloDto dto){
        return service.save(dto.toEntity());
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ApiResponse> actualizar (@RequestBody PlatilloDto dto){
        return service.update(dto.toEntity3());
    }

    @DeleteMapping("/borrar")
    public ResponseEntity<ApiResponse> delete (@RequestBody PlatilloDto dto){
        return  service.delete(dto.toEntity2());
    }
}
