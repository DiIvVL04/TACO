package mx.edu.utez.Proyecto_Intregrador.security;

import mx.edu.utez.Proyecto_Intregrador.security.jwt.JwtAuthenticationFilter;
import mx.edu.utez.Proyecto_Intregrador.security.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class MainSecurity {
    //Endpoints no restringidos a ningun rol como por ejemplo en login
    private final String[] WHITE_LIST = {
            "/api/Proyecto_Integrador/auth/**",
            "/api/Proyecto_Integrador/personal/obtener",
            /*"/api/Proyecto_Integrador/orden/**",
            "/api/Proyecto_Integrador/pedido/**",
            "/api/Proyecto_Integrador/platillo/**",
            "/api/Proyecto_Integrador/personal/**",
            "/api/Proyecto_Integrador/mesa/**",
            "/api/Proyecto_Integrador/caja/**",*/
    };
    //Endpoints dependiendo el rol (solo incluir los de su rol)

    private final String[] ADMIN = {
            "/api/Proyecto_Integrador/mesa/**",
            "/api/Proyecto_Integrador/orden/**",
            "/api/Proyecto_Integrador/pedido/**",
            "/api/Proyecto_Integrador/personal/**",
            "/api/Proyecto_Integrador/platillo/**",
            "/api/Proyecto_Integrador/caja/**",
    };

    private final String[] COCINA = {
            "/api/Proyecto_Integrador/mesa/**",
            "/api/Proyecto_Integrador/orden/**",
            "/api/Proyecto_Integrador/pedido/**",
            "/api/Proyecto_Integrador/platillo/**",
            "/api/Proyecto_Integrador/personal/**",
    };
    private final String[] CAJA = {
            "/api/Proyecto_Integrador/caja/**",
            "/api/Proyecto_Integrador/personal/**",
            "/api/Proyecto_Integrador/mesa/**"
    };

    private final String[] MESERO = {
            "/api/Proyecto_Integrador/orden/**",
            "/api/Proyecto_Integrador/pedido/**",
            "/api/Proyecto_Integrador/platillo/**",
            "/api/Proyecto_Integrador/personal/**",
            "/api/Proyecto_Integrador/mesa/**",
            "/api/Proyecto_Integrador/caja/**"
    };
    private final UserDetailsServiceImpl service;

    public MainSecurity(UserDetailsServiceImpl service) {
        this.service = service;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
        dao.setUserDetailsService(service);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationFilter filter(){
        return new JwtAuthenticationFilter();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST).permitAll()
                                .requestMatchers(ADMIN).hasAnyAuthority("Admin", "Cocina", "Mesero", "Caja")
                                /*.requestMatchers(COCINA).hasAuthority("Cocina")
                                .requestMatchers(MESERO).hasAuthority("Mesero")
                                .requestMatchers(CAJA).hasAuthority("Caja")*/)
                .httpBasic(Customizer.withDefaults()).headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(filter(), UsernamePasswordAuthenticationFilter.class)
                .logout(out -> out.logoutUrl("/api/Proyecto_Integrador/auth/om").clearAuthentication(true));
        return http.build();
    }
}
