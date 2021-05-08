package fr.mistral.config;

import fr.mistral.security.AuthenticationFilter;
import fr.mistral.security.AuthorizationFilter;
import fr.mistral.security.MevPasswordEncoderFactories;
import fr.mistral.security.SecurityConstants;
import fr.mistral.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Created by hel on 27/02/2021.
 */
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {




    @Override
    protected void configure(HttpSecurity http) throws Exception {


        http
                .cors().and()
                .csrf().disable()
                .authorizeRequests(authorize -> {
                    authorize.antMatchers("/h2-console/**").permitAll();// ne pas faire ça en prod
                    authorize.antMatchers("/v2/api-docs", "/swagger-ui.html", "/swagger-resources/**",
                            "/swagger-ui.html",
                            "/v2/api-docs",
                            "/webjars/**", "/h2-console/**").permitAll();
                    authorize.antMatchers(HttpMethod.POST, SecurityConstants.SIGN_UP_URL).permitAll();
                    authorize.mvcMatchers(HttpMethod.GET, "/api/v1/events/**").permitAll();
                }).authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .addFilter(getAuthenticationFilter())
                .addFilter(new AuthorizationFilter(authenticationManager()))
                .sessionManagement()

                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //h2 conf
        http.headers().frameOptions().disable();

    }


    protected AuthenticationFilter getAuthenticationFilter() throws Exception {
        final AuthenticationFilter filter = new AuthenticationFilter(authenticationManager());
        filter.setFilterProcessesUrl("/users/login");
        return filter;
    }
    @Bean
    PasswordEncoder passwordEncoder() {

        return MevPasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /*@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }*/
}
