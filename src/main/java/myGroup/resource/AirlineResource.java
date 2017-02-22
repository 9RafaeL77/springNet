package myGroup.resource;

import myGroup.entity.Airline;

/**
 * Created by Rafael on 21.11.2016.
 */
public class AirlineResource { //тоже DTO только между базой и приложением, поэтому тоже можно сделать final по аналогии entity.Airline

    private Integer id;

    private String name;

    public AirlineResource(Airline airline) {
        this.id = airline.getId();
        this.name = airline.getName();
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

