package myGroup.controller;


import com.google.gson.Gson;
import myGroup.resource.FlightResource;
import myGroup.entity.Airline;
import myGroup.entity.Board;
import myGroup.entity.Flight;
import myGroup.entity.Route;
import myGroup.exception.NullValueOfArgumentException;
import myGroup.interfaceRepo.FlightRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

//import org.json.simple.parser.ParseException;

/**
 * Created by Rafael on 20.11.2016.
 */
@RestController
public class FlightController {
    @Autowired
    private FlightRepo flightRepo;

    @GetMapping("/getFlightById")
    public FlightResource getFlightById(Integer id, HttpServletRequest request) throws NullValueOfArgumentException { //throws ParseException { //принимает String
        if (id != null) {
            System.out.println(request.getLocalPort());
            final Flight flight = flightRepo.findOne(id);
            if (flight != null) {
                FlightResource flightResource = new FlightResource(flight);
                return flightResource;
            } else throw new NullValueOfArgumentException("Does not exist:", "ID");
        } else throw new NullValueOfArgumentException("Enter argument:", "ID");
    }

    @GetMapping("/getAllFlight")
    public List<FlightResource> findAll() {
        final List<Flight> flights = (List<Flight>) flightRepo.findAll();
        final List<FlightResource> flightResources = new ArrayList<>();
        for (Flight flight : flights) {
            flightResources.add(new FlightResource(flight));
        }
        return flightResources;
    }

  /*  @RequestMapping("/saveFlight")
    public String saveFlight(String name) throws NullValueOfArgumentException {
        //Airline air = new Gson().fromJson(name, Airline.class);

    }*/

    @PostMapping("/saveFlight")
    public FlightResource saveAirline(Integer id, String airline, String route, String departureDate,
                                       String departureTime, String arrivalTime, Integer passengers, String board) throws NullValueOfArgumentException {
        if (id != null) {
            Flight flight = flightRepo.findOne(id);
            if (flight == null) { //в базе нет поля с таким id
                flight = new Flight();
                flight.setId(id);
                if (airline != null) {
                    flight.setAirline(new Gson().fromJson(airline, Airline.class));
                    System.out.println("AIR "+flight.getAirline().getName());
                } else throw new NullValueOfArgumentException("Enter argument:", "Airline");
                if (route != null){
                    flight.setRoute(new Gson().fromJson(route, Route.class));
                    System.out.println("ROUTE: " + flight.getRoute().getRouteFrom());
                } else throw new NullValueOfArgumentException("Enter argument:", "Route");
                if (departureDate != null){
                    flight.setDepartureDate(Date.valueOf(departureDate));
                } else throw new NullValueOfArgumentException("Enter argument:", "departureDate");
                if (departureTime != null){
                    flight.setDepartureTime(Timestamp.valueOf(departureTime));
                } else throw new NullValueOfArgumentException("Enter argument:", "departureTime");
                if (arrivalTime != null){
                    flight.setArrivalTime(Timestamp.valueOf(arrivalTime));
                } else throw new NullValueOfArgumentException("Enter argument:", "arrivalTime");
                if (passengers != null){
                    flight.setPassengers(passengers);
                } else throw new NullValueOfArgumentException("Enter argument:", "passengers");
                if (board != null){
                    flight.setBoard(new Gson().fromJson(board, Board.class));
                } else throw new NullValueOfArgumentException("Enter argument:", "Board");
                flightRepo.save(flight);
                return new FlightResource(flight);

            } else {
                flight.setAirline(new Gson().fromJson(airline, Airline.class));
                System.out.println("AIR "+flight.getAirline().getName());
                flight.setRoute(new Gson().fromJson(route, Route.class));
                System.out.println("ROUTE: " + flight.getRoute().getRouteFrom());
                flight.setDepartureDate(Date.valueOf(departureDate));
                flight.setDepartureTime(Timestamp.valueOf(departureTime));
                flight.setArrivalTime(Timestamp.valueOf(arrivalTime));
                flight.setPassengers(passengers);
                flight.setBoard(new Gson().fromJson(board, Board.class));
                flightRepo.save(flight);
                return new FlightResource(flight);
            }
        } else throw new NullValueOfArgumentException("Enter argument:", "id");
    }
    @RequestMapping("/getDATE")
    public String date(String date, String date2) {
        //Date date1 = Date.valueOf(date);
        //System.out.println("DATE:  "+date1.toString());
        System.out.println(date);
        System.out.println(Timestamp.valueOf(date));
        System.out.println(Timestamp.valueOf(date2));

        return "as";
    }

    @PostMapping("/deleteFlightById")
    public String deleteFlightById(Integer id) throws NullValueOfArgumentException {
        if(id != null) {
            Flight flight = flightRepo.findOne(id);
            if(flight != null) {
                flightRepo.delete(id);
                return "Flight with id: " + id + " deleted";
            }else throw new NullValueOfArgumentException("Does not exist:", "id");
        }else throw new NullValueOfArgumentException("Enter argument:", "id");
    }
}
