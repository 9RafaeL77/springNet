package myGroup.controller;

import myGroup.entity.Airline;
import myGroup.exception.NullValueOfArgumentException;
import myGroup.interfaceRepo.AirlineRepo;
import myGroup.resource.AirlineResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Rafael on 12.11.2016.
 */
@RestController
public class AirlineController {
    @Autowired
    private AirlineRepo airlineRepo;

    @PostMapping("/getAirlineById")
    public ResponseEntity<AirlineResource> getAirlineById(Integer id) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument: ", "id");
        }
        final Airline airline = airlineRepo.findOne(id);
        if (airline == null) {
            throw new NullValueOfArgumentException("Does not exist: ", "id");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new AirlineResource(airline));

    }

    @GetMapping("/getAllAirline")
    public List<AirlineResource> findAll() {
        final List<Airline> airlines = (List<Airline>) airlineRepo.findAll();
        final List<AirlineResource> airResources = new ArrayList<>();
        for (Airline airline : airlines) {
            airResources.add(new AirlineResource(airline));
        }
        return airResources;
    }

    @PostMapping("/saveAirline")
    public AirlineResource saveAirline(Integer id, String name) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        if (name == null) {
            throw new NullValueOfArgumentException("Enter argument:", "name");
        }
        Airline airline = airlineRepo.findOne(id);
        if (airline == null) { //в базе нет поля с таким id
            airline = new Airline();
            airline.setId(id);
            airline.setAirlineName(name);
            airlineRepo.save(airline);
            AirlineResource airlineResource = new AirlineResource(airline);
            return airlineResource;
        } else {
            airline.setAirlineName(name);
            AirlineResource airlineResource = new AirlineResource(airline);
            airlineRepo.save(airline);
            return airlineResource;
        }
    }

    @PostMapping("/getAirlineNameContaining")
    public Set<String> getAirlineNameContaining(String name) {
        List<Airline> list = airlineRepo.findByAirlineNameContaining(name);
        Set<String> set = new HashSet<>();
        for (Airline r : list) {
            set.add(r.getAirlineName());
        }
        return set;
    }

    @PostMapping("/deleteAirlineById")
    public String deleteAirlineById(Integer id) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        Airline airline = airlineRepo.findOne(id);
        if (airline == null) {
            throw new NullValueOfArgumentException("Does not exist:", "id");
        }
        airlineRepo.delete(id);
        return "Airline with id: " + id + " deleted";
    }

    /*@PostMapping("/findByAirlineName")
    public String findByAirlineName() {

        List<String> list = airlineRepo.findByAirlineName();


        return "Airline with id: " + id + " deleted";
    }*/
}
