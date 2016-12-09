package myGroup.controller;

import myGroup.resource.AirlineResource;
import myGroup.entity.Airline;
import myGroup.exception.NullValueOfArgumentException;
import myGroup.interfaceRepo.AirlineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Rafael on 12.11.2016.
 */
@RestController
public class TempString {

    @RequestMapping("/")
    String getTempString() {
        return "TempString";
    }
}
