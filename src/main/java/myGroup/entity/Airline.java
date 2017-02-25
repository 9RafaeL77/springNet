package myGroup.entity;


import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Rafael on 19.11.2016.
 */
@Entity
@Table(name="airline")
final public class Airline implements Identifiable<Integer> {

    public Airline (){}

    @Column(name="company_id")
    @Id
    private Integer idAirline;

    @Column(name="airline_name")
    private String airlineName;

    @OneToMany(mappedBy = "airline")
    private Set<Flight> flights = new HashSet<>();


    public Integer getId() {
        return idAirline;
    }

    public void setId(Integer idAirline) {
        if(idAirline != null) this.idAirline = idAirline;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        if (airlineName != null) {
            this.airlineName = airlineName;
        }
    }

}
