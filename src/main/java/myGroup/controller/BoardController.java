package myGroup.controller;

import myGroup.resource.BoardResource;
import myGroup.entity.Board;
import myGroup.exception.NullValueOfArgumentException;
import myGroup.interfaceRepo.BoardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Rafael on 20.11.2016.
 */
@RestController
public class BoardController {
    @Autowired
    private BoardRepo boardRepo;

    @GetMapping("/getBoardById")
    public BoardResource getBoardById(String name) throws NullValueOfArgumentException {
        if(name!=null) {
            final Board board = boardRepo.findOne(name);
            if (board != null) {
                BoardResource boardResource = new BoardResource(board);
                return boardResource;
            }else throw new NullValueOfArgumentException("Does not exist:", "name");
        }else throw new NullValueOfArgumentException("Enter argument:", "name");
    }

    @GetMapping("/getAllBoard")
    public List<BoardResource> findAll() {
        final List<Board> airlines = (List<Board>) boardRepo.findAll();
        final List<BoardResource> boardResources = new ArrayList<>();
        for (Board board : airlines) {
            boardResources.add(new BoardResource(board));
        }
        return boardResources;
    }

    /*@RequestMapping("/")
    public String name(){
        return "hello";
    }*/

    @PostMapping("/saveBoard")
    public BoardResource saveAirline(String name, Integer capacity, Integer econom, Integer business) throws NullValueOfArgumentException {
        if(name != null) {
            Board board = boardRepo.findOne(name);
            if (board == null) { //в базе нет поля с таким id
                board = new Board();
                board.setBoardName(name);
                if (capacity != null){
                    board.setCapacity(capacity);
                }else throw new NullValueOfArgumentException("Enter argument:","capacity");
                if (econom != null){
                    board.setEconom(econom);
                }else throw new NullValueOfArgumentException("Enter argument:","econom");
                if (business != null){
                    board.setEconom(business);
                }else throw new NullValueOfArgumentException("Enter argument:","business");
                BoardResource boardResource = new BoardResource(board);
                boardRepo.save(board);
                return boardResource;
            } else {
                board.setCapacity(capacity);
                board.setEconom(econom);
                board.setBusiness(business);
                BoardResource boardResource = new BoardResource(board);
                boardRepo.save(board);
                return boardResource;
            }
        } else throw new NullValueOfArgumentException("Enter argument:", "name");
    }

    @GetMapping("/getBoard")
    public Board getBoard() {
        final Board board = boardRepo.findOne("747");
        return board;
    }

    @PostMapping("/deleteBoardById")
    public String deleteBoardById(String name) throws NullValueOfArgumentException {
        if(name != null) {
            Board board = boardRepo.findOne(name);
            if (board != null) {
                boardRepo.delete(name);
                return "Board with name: " + name + " deleted";
            }else throw new NullValueOfArgumentException("Does not exist:", "name");
        }else throw new NullValueOfArgumentException("Enter argument:", "name");
    }
}
