package myGroup.config;

import myGroup.interfaceRepo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UsersRepo usersRepo;
    private String role;
    private String password;
    private String login;
/*@Autowired
    private UserDetailsService userDetailsService;*/


    //UserDetailsServiceImpl userDetailsService = new UserDetailsServiceImpl();

    /*    @Autowired
        public void registerGlobalAuthentication(AuthenticationManagerBuilder auth) throws Exception {
            auth
                    .userDetailsService(userDetailsService);
                    //.passwordEncoder(getShaPasswordEncoder());
        }*/

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        role = usersRepo.findOne(1).getLogin();
        password = usersRepo.findOne(1).getPassword().toString();
        login = usersRepo.findOne(1).getLogin().toString();

        System.out.println("repo: " + role);

        auth
                .inMemoryAuthentication()
                .withUser(login).password(password).roles(role)
                .and()
                .withUser("2").password("2").roles("USER")
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


        //http.formLogin().loginPage("/login.html").permitAll();
//                .loginPage("/login.html")
        //.failureUrl("/error").permitAll();
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

        http.authorizeRequests().antMatchers("/style.css").permitAll();
        http
                //.antMatchers("temp/temp1.html").permitAll()
                .formLogin().loginPage("/login.html").permitAll().and()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                /*.antMatchers("/", "/get**").hasAnyRole("USER", role)
                .antMatchers("/save**", "/delete**").hasAnyRole(role)*/
                .anyRequest().authenticated()
                .and()
                .logout().permitAll();
        //.antMatchers("/save**","/","/delete**","/get**").hasRole(role);

        /*http.authorizeRequests()
                .antMatchers("/save**","/","/delete**","/get**").hasRole(role).and()
                .formLogin().loginPage("/login.html").permitAll()
                .and()
                .logout().permitAll();*/

        // http.authorizeRequests().anyRequest().permitAll();

       /* http.logout()
                .permitAll()
                .logoutUrl("/logout")
//                .logoutSuccessUrl("/login.html")
                .invalidateHttpSession(true);*/

    }

    public UsersRepo getUsersRepo() {
        return usersRepo;
    }

    public void setUsersRepo(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

/*    @Bean
    public ShaPasswordEncoder getShaPasswordEncoder(){
        return new ShaPasswordEncoder();
    }*/

}
