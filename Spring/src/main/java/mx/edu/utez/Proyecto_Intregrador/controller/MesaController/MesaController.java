package mx.edu.utez.Proyecto_Intregrador.controller.MesaController;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.controller.MesaController.dto.MesaDto;
import mx.edu.utez.Proyecto_Intregrador.service.mesa.MesaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Proyecto_Integrador/mesa")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class MesaController {
    private final MesaService service;

    @GetMapping("/obtener")
    public ResponseEntity<ApiResponse> visualizar(){
        return service.getAll();
    }

    @PostMapping("/obtenerUno")
    public ResponseEntity<ApiResponse> visualizarId(@RequestBody MesaDto dto){
        return  service.obtenerId(dto.toEntity2());
    }
    @PostMapping("/")
    public ResponseEntity<ApiResponse> register(@RequestBody MesaDto dto){
        return service.save(dto.toEntity());

    }
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody MesaDto dto){
        return service.update(dto.toEntity3());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> delete(@RequestBody MesaDto dto){
        return service.delete(dto.toEntity2());
    }


}
