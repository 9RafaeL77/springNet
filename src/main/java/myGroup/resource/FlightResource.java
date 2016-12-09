package myGroup.resource;

/*
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
*/

import myGroup.entity.Flight;

import java.sql.Date ;
import java.sql.Timestamp;

/**
 * Created by Rafael on 21.11.2016.
 */
public class FlightResource {
    private AirlineResource airline;
    private RouteResource route;
    private Date departureDate;
    private Timestamp departureTime;
    private Timestamp arrivalTime;
    private Integer passengers;
    private BoardResource board;

    /*public FlightResource(String string) throws ParseException {
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(string);
        date = java.sql.Date.valueOf(jsonObject.get("date").toString());
        boardName = (String) jsonObject.get("boardName");

    }*/

    public FlightResource(Flight flight) {
        this.airline = new AirlineResource(flight.getAirline());
        this.route = new RouteResource(flight.getRoute());
        this.departureDate = flight.getDepartureDate();
        this.departureTime = flight.getDepartureTime();
        this.arrivalTime = flight.getArrivalTime();
        this.passengers = flight.getPassengers();
        this.board = new BoardResource(flight.getBoard());
    }

    public AirlineResource getAirline() {
        return airline;
    }

    public void setAirline(AirlineResource airline) {
        this.airline = airline;
    }

    public RouteResource getRoute() {
        return route;
    }

    public void setRoute(RouteResource route) {
        this.route = route;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Timestamp getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Timestamp departureTime) {
        this.departureTime = departureTime;
    }

    public Timestamp getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(Timestamp arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Integer getPassengers() {
        return passengers;
    }

    public void setPassengers(Integer passengers) {
        this.passengers = passengers;
    }

    public BoardResource getBoard() {
        return board;
    }

    public void setBoard(BoardResource board) {
        this.board = board;
    }
}