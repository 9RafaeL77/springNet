package myGroup.controller;

import myGroup.resource.UsersResource;
import myGroup.entity.Users;
import myGroup.exception.NullValueOfArgumentException;
import myGroup.interfaceRepo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Rafael on 20.11.2016.
 */
@RestController
public class UsersController {
    @Autowired
    private UsersRepo usersRepo;

    @GetMapping("/getUsersById")
    public UsersResource get(Integer id) throws NullValueOfArgumentException {
        if (id !=null) {
            final Users users = usersRepo.findOne(id);
            if (users != null) {
                return new UsersResource(users);
            } else throw new NullValueOfArgumentException("Does not exist:", "id");
        }else throw new NullValueOfArgumentException("Enter argument:", "id");
    }

    @GetMapping("/getAllUsers")
    public List<UsersResource> findAll() {

        final List<Users> userses = (List<Users>) usersRepo.findAll();
        final List<UsersResource> usersResources = new ArrayList<>();
        for (Users users : userses) {
            usersResources.add(new UsersResource(users));
        }
        return usersResources;
    }


    @PostMapping("/saveUser")
    public UsersResource saveUser(Integer id, String firstName, String lastName, Boolean admin) throws NullValueOfArgumentException {
        if(id != null) {
            Users users = usersRepo.findOne(id);
            if (users == null) { //в базе нет поля с таким id
                users = new Users();
                users.setId(id);
                if (firstName != null){
                    users.setFirstName(firstName);
                }else throw new NullValueOfArgumentException("Enter argument:","firstName");
                if (lastName != null){
                    users.setLastName(lastName);
                }else throw new NullValueOfArgumentException("Enter argument:","lastName");
                if (admin != null){
                    users.setAdmin(admin);
                }else throw new NullValueOfArgumentException("Enter argument:", "static/admin");
                usersRepo.save(users);
                return new UsersResource(users);
            } else {
                users.setFirstName(firstName);
                users.setLastName(lastName);
                users.setAdmin(admin);
                usersRepo.save(users);
                return new UsersResource(users);
            }
        } else throw new NullValueOfArgumentException("Enter argument:", "id");
    }
    @PostMapping("/deleteUserById")
    public String deleteUserById(Integer id) throws NullValueOfArgumentException {
        if(id != null) {
            Users users = usersRepo.findOne(id);
            if (users != null) {
                usersRepo.delete(id);
                return "User with id: " + id + " deleted";
            }else throw new NullValueOfArgumentException("Does not exist:", "id");
        }else throw new NullValueOfArgumentException("Enter argument:", "id");
    }

    @GetMapping("getUser")
    public String getUs(String name){
        return usersRepo.findByLogin(name).getLogin();
    }
}

