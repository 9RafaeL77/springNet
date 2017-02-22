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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Rafael on 20.11.2016.
 */
@RestController
public class BoardController {
    @Autowired
    private BoardRepo boardRepo;

    @PostMapping("/getBoardById")
    public BoardResource getBoardById(Integer boardId) throws NullValueOfArgumentException {
        if(boardId!=null) {
            final Board board = boardRepo.findOne(boardId);
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
    public BoardResource saveBoard(Integer boardId, String name, Integer capacity, Integer economy, Integer business)
            throws NullValueOfArgumentException {
        if(name != null) {
            Board board = boardRepo.findOne(boardId);
            if (board == null) { //в базе нет поля с таким id
                board = new Board();
                board.setBoardId(boardId);
                if (name != null){
                    board.setBoardName(name);
                }else throw new NullValueOfArgumentException("Enter argument:","boardName");
                //рекомендую все проверки входных параметров переместить вверх метода, а после проверок уже писать логику
                if (capacity != null){
                    board.setCapacity(capacity);
                }else throw new NullValueOfArgumentException("Enter argument:","capacity");
                if (economy != null){
                    board.setEconomy(economy);
                }else throw new NullValueOfArgumentException("Enter argument:","economy");
                if (business != null){
                    board.setBusiness(business);
                }else throw new NullValueOfArgumentException("Enter argument:","business");
                BoardResource boardResource = new BoardResource(board);
                boardRepo.save(board);
                return boardResource;
            } else {
                board.setBoardName(name);
                board.setCapacity(capacity);
                board.setEconomy(economy);
                board.setBusiness(business);
                BoardResource boardResource = new BoardResource(board);
                boardRepo.save(board);
                return boardResource;
            }
        } else throw new NullValueOfArgumentException("Enter argument:", "name");
    }

    /*@GetMapping("/getBoard")
    public Board getBoard() {
        final Board board = boardRepo.findOne("747");
        return board;
    }*/

    @PostMapping("/getboardNameContaining")
    public Set<String> getboardNameContaining(String name) {
        List <Board> list;
        list =  boardRepo.findByboardNameContaining(name);
        Set <String > set = new HashSet<>();
        for (Board r : list){
            set.add(r.getBoardName());
        }
        return set;
    }


    @PostMapping("/deleteBoardById")
    public String deleteBoardById(Integer boardId) throws NullValueOfArgumentException {
        if(boardId != null) {
            Board board = boardRepo.findOne(boardId);
            if (board != null) {
                boardRepo.delete(boardId);
                return "Board with name: " + boardId + " deleted";
            }else throw new NullValueOfArgumentException("Does not exist:", "name");
        }else throw new NullValueOfArgumentException("Enter argument:", "name");
    }
}
