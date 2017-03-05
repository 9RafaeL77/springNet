package myGroup.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    private String[] permitAll = {
            "/",
            "/library/*",
            "/authenticate/*",
            "/registration",
            "/user.html",
            "/search2.js",
            "/signin**",
            "/get**"

    };

    private String[] permitAdmin = {
            "/admin/*",
            "/delete**",
            "/save**",
    };

    private String[] permitAdminAndUser = {
            "/user/**",
            "/temp/**",
            "/admin.html",
            "/route.js",
            "/library/**",
            "/moment.js",
            "/logout.html"

    };

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();

        http.authorizeRequests()
                .antMatchers(permitAll).permitAll()
                .antMatchers(permitAdmin).hasRole("ADMIN")
                .antMatchers(permitAdminAndUser).hasAnyRole("ADMIN","USER")
                .anyRequest().hasAnyRole("ADMIN","USER");

        http.formLogin()
                .loginPage("/login").permitAll()
                .defaultSuccessUrl("/user.html", false).permitAll()
                .failureUrl("/error.html").permitAll();

        http.logout()
                .logoutUrl("/logout").logoutSuccessUrl("/")
                .permitAll()
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");

    }

}
