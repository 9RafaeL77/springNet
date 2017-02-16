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

    @GetMapping("/saveRoute")
    public RouteResource saveRoute(Integer id, String routeFrom, String routeTo, Time  routeTime) throws NullValueOfArgumentException, ParseException {
        Route route = null;
        if (id != null) {
            route = routeRepo.findOne(id);
            System.out.println("ID1: " + id);
            if (route == null) { //в базе нет поля с таким id
                route = new Route();
                route.setRouteId(id);
                System.out.println("ID2: " + id);
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
                return routeResources;
            } else {
                System.out.println("ID3: " + id);
                route.setRouteFrom(routeFrom);
                route.setRouteTo(routeTo);
                route.setFlightTime(routeTime);
                routeRepo.save(route);
                RouteResource routeResources = new RouteResource(route);
                return routeResources;
            }
        }else throw new NullValueOfArgumentException("Enter argument:", "id");
    }

    @GetMapping("/getrouteFromContaining")
    public Set<String> getrouteFromContaining(String city) {
        List <Route> list;
        list =  routeRepo.findByrouteFromContaining(city);
        Set <String > set = new HashSet<>();
        for (Route r : list){
            set.add(r.getRouteFrom());
        }
        return set;
    }

    @GetMapping("/getrouteToContaining")
    public Set<String> getrouteToContaining(String city) {
        List <Route> list;
        list =  routeRepo.findByrouteToContaining(city);
        Set <String > set = new HashSet<>();
        for (Route r : list){
            set.add(r.getRouteTo());
        }
        return set;
    }

    @GetMapping("/deleteRouteById")
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
