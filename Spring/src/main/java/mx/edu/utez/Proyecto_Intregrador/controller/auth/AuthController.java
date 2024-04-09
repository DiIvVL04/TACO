package mx.edu.utez.Proyecto_Intregrador.controller.auth;

import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.controller.auth.dto.SignDto;
import mx.edu.utez.Proyecto_Intregrador.service.auth.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Proyecto_Integrador/auth")
@CrossOrigin(origins = {"*"})
public class AuthController {
    private final AuthService service;
    public AuthController(AuthService service){this.service = service;}
    @PostMapping("/signin")
    public ResponseEntity<ApiResponse> signIn(@RequestBody SignDto dto){
        return service.signIn(dto.getUsername(), dto.getPassword());
    }
}
