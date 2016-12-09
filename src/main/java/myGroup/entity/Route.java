package myGroup.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Rafael on 19.11.2016.
 */

@Entity
@Table (name = "Route")
//@Repository("jdbcRouteDAO")
public class Route {

    public Route(){}



    @Id
    @GeneratedValue
    @Column(name = "route_id")
    private Integer id;

    @Column(name = "route_from")
    private String routeFrom;

    @Column (name = "route_to")
    private String routeTo;

    @Column (name = "flight_time")
    private String flightTime;

    @OneToMany(mappedBy = "route")
    private Set<Flight> flights = new HashSet<>();



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
        if(routeFrom != null) {
            this.routeFrom = routeFrom;
        }
    }

    public String getRouteTo() {
        return routeTo;
    }

    public void setRouteTo(String routeTo) {
        if(routeTo!=null) this.routeTo = routeTo;
    }

    public String getFlightTime() {
        return flightTime;
    }

    public void setFlightTime(String flightTime) {
        if(flightTime != null) this.flightTime = flightTime;
    }


}
