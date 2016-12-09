package myGroup.controller;

import myGroup.resource.AirlineResource;
import myGroup.entity.Airline;
import myGroup.exception.NullValueOfArgumentException;
import myGroup.interfaceRepo.AirlineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Rafael on 12.11.2016.
 */
@RestController
public class AirlineController {
    @Autowired
    private AirlineRepo airlineRepo;

    @GetMapping("/getAirlineById")
    public AirlineResource getAirlineById(Integer id, String name) throws NullValueOfArgumentException {
        if (id != null) {
            final Airline airline = airlineRepo.findOne(id);
            if (airline != null) {
                return new AirlineResource(airline);
            } else throw new NullValueOfArgumentException("Does not exist:", "id");
        } else throw new NullValueOfArgumentException("Enter argument:", "id");
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
    public AirlineResource saveAirline(Integer id, String name) throws NullValueOfArgumentException {
        Airline airline = null;
        if (id != null) {
            airline = airlineRepo.findOne(id);
        }
        if (airline == null) { //в базе нет поля с таким id
            airline = new Airline();
            airline.setId(id);
            if (name != null) {
                airline.setName(name);
            } else throw new NullValueOfArgumentException("Enter argument:", "name");
            airlineRepo.save(airline);
            AirlineResource airlineResource = new AirlineResource(airline);
            return airlineResource;
        } else {
            airline.setName(name);
            AirlineResource airlineResource = new AirlineResource(airline);
            airlineRepo.save(airline);
            return airlineResource;
        }
    }

    @GetMapping("/getAir")
    public Airline getAirline() throws NullValueOfArgumentException {
        final Airline airline = airlineRepo.findOne(1);
        return airline;
    }

    @PostMapping("/deleteAirlineById")
    public String deleteAirlineById(Integer id) throws NullValueOfArgumentException {
        if (id != null) {
            Airline airline = airlineRepo.findOne(id);
            if (airline != null) {
                airlineRepo.delete(id);
                return "Airline with id: " + id + " deleted";
            } else throw new NullValueOfArgumentException("Does not exist:", "id");
        } else throw new NullValueOfArgumentException("Enter argument:", "id");
    }
}
