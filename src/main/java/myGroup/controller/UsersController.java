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
    public UsersResource get(Integer id) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        final Users users = usersRepo.findOne(id);
        if (users == null) {
            throw new NullValueOfArgumentException("Does not exist:", "id");
        }
        return new UsersResource(users);
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
    public UsersResource saveUser(Integer id, String firstName, String lastName, Boolean admin) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        Users users = usersRepo.findOne(id);
        if (users == null) {

            if (firstName == null) {
                throw new NullValueOfArgumentException("Enter argument:", "firstName");
            }
            if (lastName == null) {
                throw new NullValueOfArgumentException("Enter argument:", "lastName");
            }
            if (admin == null) {
                throw new NullValueOfArgumentException("Enter argument:", "static/admin");
            }
            users = new Users();
            users.setUserId(id);
            users.setFirstName(firstName);
            users.setLastName(lastName);
            users.setAdmin(admin);
            usersRepo.save(users);
            return new UsersResource(users);
        } else {
            users.setFirstName(firstName);
            users.setLastName(lastName);
            users.setAdmin(admin);
            usersRepo.save(users);
            return new UsersResource(users);
        }
    }

    @PostMapping("/deleteUserById")
    public String deleteUserById(Integer id) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        Users users = usersRepo.findOne(id);
        if (users == null) {
            throw new NullValueOfArgumentException("Does not exist:", "id");
        }
        usersRepo.delete(id);
        return "User with id: " + id + " deleted";
    }
}

