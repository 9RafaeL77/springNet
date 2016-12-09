package myGroup.config;

import myGroup.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

/*@Autowired
    private UserDetailsService userDetailsService;*/


    UserDetailsServiceImpl userDetailsService = new UserDetailsServiceImpl();

/*    @Autowired
    public void registerGlobalAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService);
                //.passwordEncoder(getShaPasswordEncoder());
    }*/

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("1").password("1").roles("USER")
                .and()
                .withUser("2").password("2").roles("ADMIN")
                .and()
                .withUser("3").password("3").roles("ANONIM");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
//        http.authorizeRequests()
//                .antMatchers("/resources", "").permitAll()
//                //.anyRequest().permitAll()
//                .and();


        http.formLogin()
//                .loginPage("/login.html")
                .failureUrl("/error.html").permitAll();
//                .loginProcessingUrl("/login");
//                .loginProcessingUrl("/j_spring_security_check")
//                .usernameParameter("j_username")
//                .passwordParameter("j_password");
//                .failureUrl("/1.html")
//                .failureForwardUrl("/2.html").permitAll()
//                .successForwardUrl("/3.html").permitAll();
//        http.sessionManagement().sessionAuthenticationErrorUrl("/4.html")
//                .and()
//                .sessionManagement().invalidSessionUrl("/5.html");
//


        http.authorizeRequests()
                .antMatchers("temp/temp1.html").permitAll()
                .antMatchers("/user/**").hasRole("USER")
                .antMatchers("/temp/**","/*","/admin/**").hasRole("ADMIN");

        http.authorizeRequests().anyRequest().permitAll();

        http.logout()
                .permitAll()
                .logoutUrl("/logout")
//                .logoutSuccessUrl("/login.html")
                .invalidateHttpSession(true);

    }

/*    @Bean
    public ShaPasswordEncoder getShaPasswordEncoder(){
        return new ShaPasswordEncoder();
    }*/

}
