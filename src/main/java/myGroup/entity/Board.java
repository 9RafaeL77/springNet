package myGroup.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Rafael on 19.11.2016.
 */
@Entity
@Table(name="Board")
//@Repository("jdbcBoardDAO")
final public class Board {

    public Board(){}

    @Id
    @Column(name = "board_id")
    private Integer boardId;

    @Column(name="board_name", unique = true)
    private String boardName;

    @Column
    private Integer capacity;

    @Column
    private Integer economy;

    @Column
    private Integer business;

    @OneToMany(mappedBy = "board")
    private Set<Flight> flights = new HashSet<>();

    public Integer getBoardId() {
        return boardId;
    }

    public void setBoardId(Integer boardId) {
        this.boardId = boardId;
    }

    public String getBoardName() {
        return boardName;
    }

    public void setBoardName(String boardName) {
        if(boardName !=null) this.boardName = boardName;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        if(capacity!=null) this.capacity = capacity;
    }

    public Integer getEconomy() {
        return economy;
    }

    public void setEconomy(Integer economy) {
        if(economy!=null) this.economy = economy;
    }

    public Integer getBusiness() {
        return business;
    }

    public void setBusiness(Integer business) {
        if(business!=null) this.business = business;
    }
}
