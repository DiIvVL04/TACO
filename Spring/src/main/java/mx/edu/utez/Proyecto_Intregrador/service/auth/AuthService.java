package mx.edu.utez.Proyecto_Intregrador.service.auth;

import mx.edu.utez.Proyecto_Intregrador.config.ApiResponse;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import mx.edu.utez.Proyecto_Intregrador.security.jwt.JwtProvider;
import mx.edu.utez.Proyecto_Intregrador.service.personal.PersonalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AuthService {
    private final PersonalService personalService;

    private final JwtProvider provider;

    private final AuthenticationManager manager;

    public AuthService(PersonalService personalService, JwtProvider provider, AuthenticationManager manager) {
        this.personalService = personalService;
        this.provider = provider;
        this.manager = manager;
    }

    @Transactional
    public ResponseEntity<ApiResponse> signIn(String username, String password) {
        try {
            BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
            Optional<PersonalBean> foundPersonal = personalService.findUserByUsername(username);
            System.out.println("Encriptado: "+ bcrypt.toString());
            System.out.println("Persona: ");
            System.out.println(foundPersonal.get().getPassword());
            System.out.println(foundPersonal.get().getUsername());
            if (foundPersonal.isEmpty())
                return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "UserNotFound"), HttpStatus.BAD_REQUEST);
            if (!bcrypt.matches(password, foundPersonal.get().getPassword()))
                return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "UserPassNotFound"), HttpStatus.BAD_REQUEST);

            System.out.println(new UsernamePasswordAuthenticationToken(username,password));
            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(username,password)
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = provider.generateToken(auth);

            return new ResponseEntity<>(new ApiResponse(token,HttpStatus.OK,"Token Generado"),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            String message = "CredentialsMismatch";
            if (e instanceof DisabledException)
                message = "UserDisabled";
            if (e instanceof AccountExpiredException)
                message = "Expiro";
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST,true,message),HttpStatus.UNAUTHORIZED);
        }

    }
}
