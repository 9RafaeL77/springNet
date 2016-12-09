package myGroup.service;

import myGroup.entity.Users;
import myGroup.interfaceRepo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsersRepo usersRepo;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        /*Users user = null;
        System.out.println("usersRepo  =" + usersRepo);
        Iterable<Users> userses = usersRepo.findAll();

        for(Users tempUser: userses) {
            if (tempUser.getLogin().equals(login)) {
                user = tempUser;
            }
        }*/

        /*if (user == null)
            throw new UsernameNotFoundException("User " + login + " doesn't exist!");*/

        Set<GrantedAuthority> roles = new HashSet<>();
        roles.add(new SimpleGrantedAuthority("USER"));

        return new org.springframework.security.core.userdetails
                .User("1234", "1234", roles);
    }
}
