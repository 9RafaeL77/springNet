package myGroup.resource;

import myGroup.entity.Board;

/**
 * Created by Rafael on 21.11.2016.
 */
public class BoardResource {
    private String name;
    private Integer capacity;
    private Integer econom;
    private Integer business;


    public BoardResource(Board board) {
        this.name = board.getName();
        this.capacity = board.getCapacity();
        this.econom = board.getEconom();
        this.business = board.getBusiness();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getEconom() {
        return econom;
    }

    public void setEconom(Integer econom) {
        this.econom = econom;
    }

    public Integer getBusiness() {
        return business;
    }

    public void setBusiness(Integer business) {
        this.business = business;
    }
}
