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
    private String airlineName;
    private Integer route;
    private Timestamp departureTime;
    private Timestamp arrivalTime;
    private String boardName;
    private Integer passengers;

    /*public FlightResource(String string) throws ParseException {
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(string);
        date = java.sql.Date.valueOf(jsonObject.get("date").toString());
        boardName = (String) jsonObject.get("boardName");

    }*/

    public FlightResource(Flight flight) {
        this.id = flight.getFlightId();
        this.airlineName = flight.getAirline().getName();
        this.route = flight.getRoute().getRouteId();
        this.departureTime = flight.getDepartureTime();
        this.arrivalTime = flight.getArrivalTime();
        this.boardName = flight.getBoard().getBoardName();
        this.passengers = flight.getPassengers();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAirline() {
        return airlineName;
    }

    public void setAirline(String airline) {
        this.airlineName = airline;
    }

    public Integer getRoute() {
        return route;
    }

    public void setRouteFrom(Integer route) {
        this.route = route;
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

    public String getBoard() {
        return boardName;
    }

    public void setBoard(String board) {
        this.boardName = board;
    }

    public Integer getPassengers() {
        return passengers;
    }

    public void setPassengers(Integer passengers) {
        this.passengers = passengers;
    }
}
