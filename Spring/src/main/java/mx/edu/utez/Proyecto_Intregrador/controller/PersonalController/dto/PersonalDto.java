package mx.edu.utez.Proyecto_Intregrador.controller.PersonalController.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;

@NoArgsConstructor
@Data
public class PersonalDto {
    private Long idPersonal;
    private String nombre;
    private String apellido_pat;
    private String apellido_mat;
    private String email;
    private String rol;
    private String username;
    private String password;
    public PersonalBean toEntity(){
        return new PersonalBean(nombre, apellido_pat, apellido_mat, email,rol, username, password);
    }

    public PersonalBean toEntity2(){
        return new PersonalBean(idPersonal);
    }

    public PersonalBean toEntity3(){
        return new PersonalBean(idPersonal, nombre, apellido_pat, apellido_mat, email,rol, username, password);
    }

}
