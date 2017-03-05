package myGroup.config;

/**
 * Created by Home on 18.02.2017.
 */

import myGroup.entity.Users;
import myGroup.interfaceRepo.UsersRepo;
import myGroup.config.SecurityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class AppController {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private SecurityServiceImpl securityServiceImpl;

    @RequestMapping(value = {"/"}, method = {RequestMethod.GET})
    public ModelAndView welcomePage() {
        ModelAndView model = new ModelAndView();
        model.setViewName("/user.html");
        return model;
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public ModelAndView admin() {
        ModelAndView model = new ModelAndView("forward:/admin/admin.html");
        return model;
    }

    @RequestMapping(value = "/signin", method = RequestMethod.POST)
    public ModelAndView signin(String username, String password) {
        securityServiceImpl.login(username, password);
        ModelAndView model = new ModelAndView("redirect:/admin");
        return model;
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login() {
        ModelAndView model = new ModelAndView("/authenticate/login.html");
        return model;
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ModelAndView registration(@ModelAttribute("userForm") Users userForm) {
        System.out.println("REG: " + userForm);
        usersRepo.save(userForm);
        ModelAndView model = new ModelAndView("redirect:/");
        //model.setViewName("/user.html");
        System.out.println("MODEL" + model);
        return model;
    }

}