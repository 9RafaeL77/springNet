package myGroup.controller;


import myGroup.resource.RouteResource;
import myGroup.entity.Route;
import myGroup.exception.NullValueOfArgumentException;
import myGroup.interfaceRepo.RouteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Rafael on 20.11.2016.
 */
@RestController
public class RouteController {
    @Autowired
    private RouteRepo routeRepo;

    @GetMapping("/getRouteById")
    public RouteResource getRouteById(Integer id) throws NullValueOfArgumentException {
        if (id != null) {
            final Route route = routeRepo.findOne(id);
            if (route != null) {
                return new RouteResource(route);
            } else throw new NullValueOfArgumentException("Does not exist:", "id");
        } else throw new NullValueOfArgumentException("Enter argument:", "id");
    }

    @GetMapping("/getAllRoute")
    public List<RouteResource> findAll() {
        final List<Route> routes = (List<Route>) routeRepo.findAll();
        final List<RouteResource> routeResources = new ArrayList<>();
        for (Route route : routes) {
            routeResources.add(new RouteResource(route));
        }
        return routeResources;
    }

    @PostMapping("/saveRoute")
    public RouteResource saveRoute(Integer id, String routeFrom, String routeTo, String routeTime) throws NullValueOfArgumentException {
        Route route = null;
        if (id != null) {
            route = routeRepo.findOne(id);
        }
        if (route == null) { //в базе нет поля с таким id
            route = new Route();
            route.setId(id);
            if (routeFrom != null) {
                route.setRouteFrom(routeFrom);
            } else throw new NullValueOfArgumentException("Enter argument:", "routeFrom");
            if (routeTo != null) {
                route.setRouteTo(routeTo);
            } else throw new NullValueOfArgumentException("Enter argument:", "routeTo");
            if (routeTime != null) {
                route.setFlightTime(routeTime);
            } else throw new NullValueOfArgumentException("Enter argument:", "routeTime");
            routeRepo.save(route);
            RouteResource routeResources = new RouteResource(route);
            routeRepo.save(route);
            return routeResources;
        } else {
            route.setRouteFrom(routeFrom);
            route.setRouteTo(routeTo);
            route.setFlightTime(routeTime);
            routeRepo.save(route);
            RouteResource routeResources = new RouteResource(route);
            routeRepo.save(route);
            return routeResources;
        }
    }

    @GetMapping("/getRoute")
    public Route getRoute() {
        final Route route = routeRepo.findOne(1);
        return route;
    }

    @PostMapping("/deleteRouteById")
    public String deleteRouteById(Integer id) throws NullValueOfArgumentException {
        if (id != null) {
            Route route = routeRepo.findOne(id);
            if (route != null) {
                routeRepo.delete(id);
                return "Route with id: " + id + " deleted";
            } else throw new NullValueOfArgumentException("Does not exist:", "id");
        } else throw new NullValueOfArgumentException("Enter argument:", "id");
    }
}
