package myGroup.entity;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Rafael on 19.11.2016.
 */

@Entity
@Table (name = "Route")
public class Route {

    public Route(){}

    @Id
    @GeneratedValue
    @Column(name = "route_id")
    private Integer routeId;

    @Column(name = "route_from")
    private String routeFrom;

    @Column (name = "route_to")
    private String routeTo;

    @Column (name = "flight_time")
    private Time flightTime;

    @OneToMany(mappedBy = "route")
    private Set<Flight> flights = new HashSet<>();



    public Integer getRouteId() {
        return routeId;
    }

    public void setRouteId(Integer routeId) {
        this.routeId = routeId;
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

    public Time getFlightTime() {
        return flightTime;
    }

    public void setFlightTime(Time flightTime) {
        if(flightTime != null) this.flightTime = flightTime;
    }


}
