package mx.edu.utez.Proyecto_Intregrador.model.personal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Proyecto_Intregrador.model.orden.OrdenBean;
import mx.edu.utez.Proyecto_Intregrador.model.pedido.PedidoBean;

import java.util.Set;

@Entity
@Table (name = "personal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPersonal;
    @Column(nullable = false, length = 100)
    private String nombre;
    @Column(nullable = false, length = 45)
    private String apellido_pat;
    @Column(nullable = false, length = 45)
    private String apellido_mat;
    @Column(nullable = false, length = 100)
    private String email;
    @Column(nullable = false, length = 45)
    private String username;
    @Column(nullable = false, length = 45)
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "personalBean", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<OrdenBean> ordenBeans;

    @JsonIgnore
    @OneToMany(mappedBy = "personalBean")
    private Set<PedidoBean> pedidoBeans;

    public PersonalBean(String nombre, String apellido_pat, String apellido_mat, String email, String username, String password) {
        this.nombre = nombre;
        this.apellido_pat = apellido_pat;
        this.apellido_mat = apellido_mat;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public PersonalBean(Long idPersonal) {
        this.idPersonal = idPersonal;
    }

    public PersonalBean(Long idPersonal, String nombre, String apellido_pat, String apellido_mat, String email, String username, String password) {
        this.idPersonal = idPersonal;
        this.nombre = nombre;
        this.apellido_pat = apellido_pat;
        this.apellido_mat = apellido_mat;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
