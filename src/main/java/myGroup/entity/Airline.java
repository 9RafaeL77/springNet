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
public class Airline implements Identifiable<Integer> {

    public Airline (){}

    @Column(name="company_id")
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String name;

    @OneToMany(mappedBy = "airline")
    private Set<Flight> flights = new HashSet<>();


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        if(id != null) this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name != null) {
            this.name = name;
        }
    }

}
