package myGroup.resource;

import myGroup.entity.Airline;

/**
 * Created by Rafael on 21.11.2016.
 */
public class AirlineResource {

    private String name;

    public AirlineResource(Airline airline) {
        this.name = airline.getName();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

