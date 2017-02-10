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
public class Board {

    public Board(){}

    @Id
    @Column(name="board_name")
    private String boardName;

    @Column
    private Integer capacity;

    @Column
    private Integer econom;

    @Column
    private Integer business;

    @OneToMany(mappedBy = "board")
    private Set<Flight> flights = new HashSet<>();

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

    public Integer getEconom() {
        return econom;
    }

    public void setEconom(Integer econom) {
        if(econom!=null) this.econom = econom;
    }

    public Integer getBusiness() {
        return business;
    }

    public void setBusiness(Integer business) {
        if(business!=null) this.business = business;
    }
}
