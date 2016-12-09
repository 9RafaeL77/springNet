package myGroup.resource;

import myGroup.entity.Route;

/**
 * Created by Rafael on 21.11.2016.
 */
public class RouteResource {
    private String routeFrom;
    private String routeTo;
    private String flightTime;


    public RouteResource(Route route) {
        this.routeFrom = route.getRouteFrom();
        this.routeTo = route.getRouteTo();
        this.flightTime = route.getFlightTime();
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

    public String getFlightTime() {
        return flightTime;
    }

    public void setFlightTime(String flightTime) {
        this.flightTime = flightTime;
    }
}
