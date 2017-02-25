package myGroup.controller;


import myGroup.resource.RouteResource;
import myGroup.entity.Route;
import myGroup.exception.NullValueOfArgumentException;
import myGroup.interfaceRepo.RouteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Time;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Rafael on 20.11.2016.
 */
@RestController
public class RouteController {
    @Autowired
    private RouteRepo routeRepo;

    @GetMapping("/getRouteById")
    public RouteResource getRouteById(Integer id) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        final Route route = routeRepo.findOne(id);
        if (route == null) {
            throw new NullValueOfArgumentException("Does not exist:", "id");
        }
        return new RouteResource(route);
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
    public RouteResource saveRoute(Integer id, String routeFrom, String routeTo, Time routeTime) throws ParseException {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        Route route = routeRepo.findOne(id);
        if (route == null) {
            if (routeFrom == null) {
                throw new NullValueOfArgumentException("Enter argument:", "routeFrom");
            }
            if (routeTo == null) {
                throw new NullValueOfArgumentException("Enter argument:", "routeTo");
            }
            if (routeTime == null) {
                throw new NullValueOfArgumentException("Enter argument:", "routeTime");
            }
            route = new Route();
            route.setRouteId(id);
            route.setRouteFrom(routeFrom);
            route.setRouteTo(routeTo);
            route.setFlightTime(routeTime);
            routeRepo.save(route);
            RouteResource routeResources = new RouteResource(route);
            return routeResources;
        } else {
            route.setRouteFrom(routeFrom);
            route.setRouteTo(routeTo);
            route.setFlightTime(routeTime);
            routeRepo.save(route);
            RouteResource routeResources = new RouteResource(route);
            return routeResources;
        }
    }

    @PostMapping("/getRouteFromContaining")
    public Set<String> getRouteFromContaining(String name) {
        List<Route> list;
        list = routeRepo.findByRouteFromContaining(name);
        Set<String> set = new HashSet<>();
        for (Route r : list) {
            set.add(r.getRouteFrom());
        }
        return set;
    }

    @PostMapping("/getRouteToContaining")
    public Set<String> getRouteToContaining(String name) {
        List<Route> list;
        list = routeRepo.findByRouteToContaining(name);
        Set<String> set = new HashSet<>();
        for (Route r : list) {
            set.add(r.getRouteTo());
        }
        return set;
    }

    @PostMapping("/deleteRouteById")
    public String deleteRouteById(Integer id) {
        if (id == null) {
            throw new NullValueOfArgumentException("Enter argument:", "id");
        }
        Route route = routeRepo.findOne(id);
        if (route == null) {
            throw new NullValueOfArgumentException("Does not exist:", "id");
        }
        routeRepo.delete(id);
        return "Route with id: " + id + " deleted";
    }
}
