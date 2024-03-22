package mx.edu.utez.Proyecto_Intregrador.controller.PersonalController;

import lombok.AllArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.controller.PersonalController.dto.PersonalDto;
import mx.edu.utez.Proyecto_Intregrador.service.personal.PersonalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Proyecto_Integrador/personal")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PersonalController {
    private final PersonalService service;

    @GetMapping("/obtener")
    public ResponseEntity<ApiResponse> getAll(){
        return service.getAll();
    }

    @PostMapping("/obtenerUno")
    public ResponseEntity<ApiResponse> getId(@RequestBody PersonalDto dto){
        return service.obtenerId(dto.toEntity2());
    }

    @PostMapping("/guardar")
    public ResponseEntity<ApiResponse> register(@RequestBody PersonalDto dto){
        return service.save(dto.toEntity());
    }

    @PutMapping("/actualizar")
    public ResponseEntity<ApiResponse> actualizar(@RequestBody PersonalDto dto){
        return service.update(dto.toEntity3());
    }

    @DeleteMapping("/borrar")
    public ResponseEntity<ApiResponse> delete(@RequestBody PersonalDto dto){
        return service.delete(dto.toEntity2());
    }


}
