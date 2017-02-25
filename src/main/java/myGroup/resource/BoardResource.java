package myGroup.resource;

import myGroup.entity.Board;

/**
 * Created by Rafael on 21.11.2016.
 */
final public class BoardResource {
    private Integer id;
    private String name;
    private Integer capacity;
    private Integer economy;
    private Integer business;


    public BoardResource(Board board) {
        this.id = board.getBoardId();
        this.name = board.getBoardName();
        this.capacity = board.getCapacity();
        this.economy = board.getEconomy();
        this.business = board.getBusiness();
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

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getEconomy() {
        return economy;
    }

    public void setEconomy(Integer economy) {
        this.economy = economy;
    }

    public Integer getBusiness() {
        return business;
    }

    public void setBusiness(Integer business) {
        this.business = business;
    }
}
