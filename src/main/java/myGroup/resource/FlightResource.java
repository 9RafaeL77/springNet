package myGroup.resource;

/*
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
*/

import myGroup.entity.Flight;

import java.sql.Timestamp;

/**
 * Created by Rafael on 21.11.2016.
 */
public class FlightResource {
    private Integer id;
    private AirlineResource airlineName;
    private RouteResource route;
    private String departureTime;
    private String arrivalTime;
    private BoardResource boardName;
    private Integer passengers;

    /*public FlightResource(String string) throws ParseException {
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(string);
        date = java.sql.Date.valueOf(jsonObject.get("date").toString());
        boardName = (String) jsonObject.get("boardName");

    }*/

    public FlightResource(Flight flight) {
        this.id = flight.getFlightId();
        this.airlineName = new AirlineResource(flight.getAirline());
        this.route = new RouteResource(flight.getRoute());
        this.departureTime = flight.getDepartureTime().toString();
        this.arrivalTime = flight.getArrivalTime().toString();
        this.boardName = new BoardResource(flight.getBoard());
        this.passengers = flight.getPassengers();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AirlineResource getAirline() {
        return airlineName;
    }

    public void setAirline(AirlineResource airline) {
        this.airlineName = airline;
    }

    public RouteResource getRoute() {
        return route;
    }

    public void setRouteFrom(RouteResource route) {
        this.route = route;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public BoardResource getBoard() {
        return boardName;
    }

    public void setBoard(BoardResource board) {
        this.boardName = board;
    }

    public Integer getPassengers() {
        return passengers;
    }

    public void setPassengers(Integer passengers) {
        this.passengers = passengers;
    }
}
