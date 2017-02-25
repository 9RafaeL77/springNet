package myGroup.resource;

import myGroup.entity.Airline;

/**
 * Created by Rafael on 21.11.2016.
 */
final public class AirlineResource {

    private Integer id;

    private String name;

    public AirlineResource(Airline airline) {
        this.id = airline.getId();
        this.name = airline.getAirlineName();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

