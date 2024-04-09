package mx.edu.utez.Proyecto_Intregrador.security.model;

import mx.edu.utez.Proyecto_Intregrador.model.personal.PersonalBean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private String username;
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String username, String password,String Rol) {
        this.username = username;
        this.password = password;
        List<GrantedAuthority> authorities  = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(Rol));
        this.authorities=authorities;
    }

    public static UserDetailsImpl build(PersonalBean personal){
        return new UserDetailsImpl(personal.getUsername(), personal.getPassword(),personal.getRol());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
//return false?
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
