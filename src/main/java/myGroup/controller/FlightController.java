package myGroup.controller;


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
    public FlightResource getFlightById(Integer id, HttpServletRequest request) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "ID");
        }
        final Flight flight = flightRepo.findOne(id);
        if (flight == null) {
            throw new NullValueOfArgumentException("Does not exist:", "ID");
        }
        FlightResource flightResource = new FlightResource(flight);
        return flightResource;
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
    public FlightResource saveFlight(Integer id, Integer airlineId, Integer routeId,
                                     String departureTime, Integer boardId, Integer passengers) throws ParseException {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        Flight flight = flightRepo.findOne(id);
        Airline airline;
        Route route;
        Board board;
        Timestamp depTime;
        Timestamp arrivalTime;
        if (flight == null) {
            flight = new Flight();
            flight.setFlightId(id);
            if (airlineId != null) {
                airline = airlineRepo.findOne(airlineId);
                if (airline == null) {
                    throw new NullValueOfArgumentException("Uncorrected id for :", "Airline");
                }
                flight.setAirline(airline);
            } else {
                throw new NullValueOfArgumentException("Enter argument:", "Airline");
            }
            if (routeId != null) {
                route = routeRepo.findOne(routeId);
                if (route == null) {
                    throw new NullValueOfArgumentException("Uncorrected id for :", "Route");
                }
                flight.setRoute(route);
            } else {
                throw new NullValueOfArgumentException("Enter argument:", "Route");
            }
            if (boardId != null) {
                board = boardRepo.findOne(boardId);
                if (board == null) {
                    throw new NullValueOfArgumentException("Uncorrected id for :", "Board");
                }
                flight.setBoard(board);
            } else {
                throw new NullValueOfArgumentException("Enter argument:", "Board");
            }
            if (departureTime != null) {
                LocalDateTime dep = LocalDateTime.of(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                                .parse(departureTime).getTime())
                                .toLocalDate(),
                        new Time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                                .parse(departureTime).getTime()).toLocalTime());
                depTime = Timestamp.valueOf(dep);
                LocalTime flightTime = route.getFlightTime().toLocalTime();
                arrivalTime = Timestamp.valueOf(depTime.toLocalDateTime().plusHours(flightTime.
                        getHour()).plusMinutes(flightTime.getMinute()));
                flight.setDepartureTime(depTime);
                flight.setArrivalTime(arrivalTime);
            } else {
                throw new NullValueOfArgumentException("Enter argument:", "departureTime");
            }
            if (passengers == null) {
                throw new NullValueOfArgumentException("Enter argument:", "passengers");
            }
            flight.setPassengers(passengers);
            flightRepo.save(flight);
            return new FlightResource(flight);
            /*//////////////////////////////////////////////////////////////////////////////////////////////*/
        } else {
            if (airlineId != null) {
                airline = airlineRepo.findOne(airlineId);
                if (airline == null) {
                    throw new NullValueOfArgumentException("Uncorrected id for :", "Airline");
                }
                flight.setAirline(airline);
            }
            if (routeId != null) {
                route = routeRepo.findOne(routeId);
                if (route == null) {
                    throw new NullValueOfArgumentException("Uncorrected id for :", "Route");
                }
                flight.setRoute(route);
            }
            if (boardId != null) {
                board = boardRepo.findOne(boardId);
                if (board == null) {
                    throw new NullValueOfArgumentException("Uncorrected id for :", "Board");
                }
                flight.setBoard(board);
            }
            if (departureTime != null) {
                LocalDateTime dep = LocalDateTime.of(new Date(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                                .parse(departureTime).getTime())
                                .toLocalDate(),
                        new Time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                                .parse(departureTime).getTime()).toLocalTime());
                depTime = Timestamp.valueOf(dep);
                LocalTime flightTime = flight.getRoute().getFlightTime().toLocalTime();
                arrivalTime = Timestamp.valueOf(depTime.toLocalDateTime().plusHours(flightTime.
                        getHour()).plusMinutes(flightTime.getMinute()));
                flight.setDepartureTime(depTime);
                flight.setArrivalTime(arrivalTime);
            }
            if (passengers != null) {
                flight.setPassengers(passengers);
            }
            flightRepo.save(flight);
            return new FlightResource(flight);
        }
    }

    @PostMapping("/deleteFlightById")
    public String deleteFlightById(Integer id) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        Flight flight = flightRepo.findOne(id);
        if (flight == null) {
            throw new NullValueOfArgumentException("Does not exist:", "id");
        }
        flightRepo.delete(id);
        return "Flight with id: " + id + " deleted";
    }
}
