package myGroup.entity;



import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Rafael on 19.11.2016.
 */
@Entity
@Table(name = "Flight")
//@Repository("jdbcFlightDAO")
public class Flight {

    public Flight(){}

    @Id
    @Column(name = "flight_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Airline airline;

    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;

    @Column (name = "departure_date")
    private Date departureDate;

    @Column (name = "departure_time")
    private Timestamp departureTime;

    @Column (name = "arrival_time")
    private Timestamp arrivalTime;

    @Column
    private Integer passengers;

    @ManyToOne
    @JoinColumn(name = "board_name")
    private Board board;

    @ManyToMany
    @JoinTable(name = "comm", joinColumns = {@JoinColumn(name = "flight_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private Set<Users> users = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Airline getAirline() {
        return airline;
    }

    public void setAirline(Airline airline) {
        this.airline = airline;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public Set<Users> getUsers() {
        return users;
    }

    public void setUsers(Set<Users> users) {
        this.users = users;
    }
}
