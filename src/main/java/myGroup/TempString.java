package myGroup;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Rafael on 12.11.2016.
 */
@RestController
public class TempString {

    @RequestMapping("/")
    String getTempString() {
        return "TempString";
    }

    /*@RequestMapping("/login")
    String getString(String name, String password) {
        return name+" " + password;
    }*/
}
