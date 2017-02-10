package myGroup.controller;


import com.google.gson.Gson;
import myGroup.interfaceRepo.AirlineRepo;
import myGroup.interfaceRepo.BoardRepo;
import myGroup.interfaceRepo.RouteRepo;
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
import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.SimpleTimeZone;

//import org.json.simple.parser.ParseException;

/**
 * Created by Rafael on 20.11.2016.
 */
@RestController
public class FlightController {
    @Autowired
    private FlightRepo flightRepo;
    @Autowired
    private AirlineRepo airlineRepo;
    @Autowired
    private RouteRepo routeRepo;
    @Autowired
    private BoardRepo boardRepo;

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

    @GetMapping("/saveFlight")
    public FlightResource saveAirline(Integer id, Integer airlineId, Integer routeId,
                                      String departureTime, String boardId, Integer passengers)
            throws NullValueOfArgumentException, ParseException {
        if (id != null) {
            Flight flight = flightRepo.findOne(id);
            Airline airline;
            Route route;
            Board board;
            Timestamp depTime;
            Timestamp arrivalTime;
            if (airlineId != null) {
                airline = airlineRepo.findOne(airlineId);
                if (airline == null) throw new NullValueOfArgumentException("Uncorrected id for :", "Airline");
            } else throw new NullValueOfArgumentException("Enter argument:", "Airline");
            if (routeId != null) {
                route = routeRepo.findOne(routeId);
                if (route == null) throw new NullValueOfArgumentException("Uncorrected id for :", "Route");
            } else throw new NullValueOfArgumentException("Enter argument:", "Route");
            if (boardId != null) {
                board = boardRepo.findOne(boardId);
                if (board == null) throw new NullValueOfArgumentException("Uncorrected id for :", "Board");
            } else throw new NullValueOfArgumentException("Enter argument:", "Board");
            if (departureTime != null) {
                LocalDateTime dep = LocalDateTime.of(new Date(new SimpleDateFormat("yyyy.MM.dd:HH:mm")
                                .parse(departureTime).getTime())
                                .toLocalDate(),
                        new Time(new SimpleDateFormat("yyyy.MM.dd:HH:mm")
                                .parse(departureTime).getTime()).toLocalTime());
                depTime = Timestamp.valueOf(dep);
                LocalTime flightTime = route.getFlightTime().toLocalTime();
                arrivalTime = Timestamp.valueOf(depTime.toLocalDateTime().plusHours(flightTime.
                        getHour()).plusMinutes(flightTime.getMinute()));
            } else throw new NullValueOfArgumentException("Enter argument:", "departureTime");
            if (passengers == null) throw new NullValueOfArgumentException("Enter argument:", "passengers");
            /*-------------------------------------------------------------------------------------------*/
            if (flight == null) { //в базе нет поля с таким id
                flight = new Flight();
                flight.setFlightId(id);
                //flight.setAirline(new Gson().fromJson(airline, Airline.class));
                flight.setAirline(airline);
                System.out.println("AIR " + flight.getAirline().getName());
                //flight.setRoute(new Gson().fromJson(route, Route.class));
                flight.setRoute(route);
                System.out.println("ROUTE: " + flight.getRoute().getRouteFrom());
                flight.setDepartureTime(depTime);
                flight.setArrivalTime(arrivalTime);
                flight.setPassengers(passengers);
                //flight.setBoard(new Gson().fromJson(board, Board.class));
                flight.setBoard(board);
                flightRepo.save(flight);
                return new FlightResource(flight);
            } else {
                //flight.setAirline(new Gson().fromJson(airline, Airline.class));
                flight.setAirline(airline);
                System.out.println("AIR " + flight.getAirline().getName());
                //flight.setRoute(new Gson().fromJson(route, Route.class));
                flight.setRoute(route);
                System.out.println("ROUTE: " + flight.getRoute().getRouteFrom());
                flight.setDepartureTime(depTime);
                flight.setArrivalTime(arrivalTime);
                flight.setPassengers(passengers);
                //flight.setBoard(new Gson().fromJson(board, Board.class));
                flight.setBoard(board);
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
        if (id != null) {
            Flight flight = flightRepo.findOne(id);
            if (flight != null) {
                flightRepo.delete(id);
                return "Flight with id: " + id + " deleted";
            } else throw new NullValueOfArgumentException("Does not exist:", "id");
        } else throw new NullValueOfArgumentException("Enter argument:", "id");
    }
}
