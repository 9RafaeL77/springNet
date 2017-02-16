package myGroup.resource;

import myGroup.entity.Route;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;

/**
 * Created by Rafael on 21.11.2016.
 */
public class RouteResource {
    private Integer id;
    private String routeFrom;
    private String routeTo;
    private Time flightTime;

    public RouteResource(Route route) {
        this.id = route.getRouteId();
        this.routeFrom = route.getRouteFrom();
        this.routeTo = route.getRouteTo();
        this.flightTime = route.getFlightTime();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRouteFrom() {
        return routeFrom;
    }

    public void setRouteFrom(String routeFrom) {
        this.routeFrom = routeFrom;
    }

    public String getRouteTo() {
        return routeTo;
    }

    public void setRouteTo(String routeTo) {
        this.routeTo = routeTo;
    }

    public Time getFlightTime() {
        return flightTime;
    }

    public void setFlightTime(Time flightTime) {
        this.flightTime = flightTime;
    }
}
