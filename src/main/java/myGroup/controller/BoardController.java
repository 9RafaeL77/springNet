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
    public BoardResource getBoardById(Integer boardId) {
        if (boardId == null) {
            throw new NullValueOfArgumentException("Enter argument:", "name");
        }
        final Board board = boardRepo.findOne(boardId);
        if (board == null) {
            throw new NullValueOfArgumentException("Does not exist:", "name");
        }
        BoardResource boardResource = new BoardResource(board);
        return boardResource;
    }

    @GetMapping("/getAllBoard")
    public List<BoardResource> findAllBoard() {
        final List<Board> airlines = (List<Board>) boardRepo.findAll();
        final List<BoardResource> boardResources = new ArrayList<>();
        for (Board board : airlines) {
            boardResources.add(new BoardResource(board));
        }
        return boardResources;
    }

    @PostMapping("/saveBoard")
    public BoardResource saveBoard(Integer boardId, String name, Integer capacity, Integer economy, Integer business) {
        if (boardId == null) {
            throw new NullValueOfArgumentException("Enter argument:", "boardId");
        }
        Board board = boardRepo.findOne(boardId);
        if (board == null) { //в базе нет поля с таким id
            if (name == null) {
                throw new NullValueOfArgumentException("Enter argument:", "boardName");
            }
            if (capacity == null) {
                throw new NullValueOfArgumentException("Enter argument:", "capacity");
            }
            if (economy == null) {
                throw new NullValueOfArgumentException("Enter argument:", "economy");
            }
            if (business == null) {
                throw new NullValueOfArgumentException("Enter argument:", "business");
            }
            board = new Board();
            board.setBoardId(boardId);
            board.setBoardName(name);
            board.setCapacity(capacity);
            board.setEconomy(economy);
            board.setBusiness(business);
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
    }

    @PostMapping("/getBoardNameContaining")
    public Set<String> getBoardNameContaining(String name) {
        List<Board> list;
        list = boardRepo.findByBoardNameContaining(name);
        Set<String> set = new HashSet<>();
        for (Board r : list) {
            set.add(r.getBoardName());
        }
        return set;
    }


    @PostMapping("/deleteBoardById")
    public String deleteBoardById(Integer boardId) {
        if (boardId == null) {
            throw new NullValueOfArgumentException("Enter argument:", "name");
        }
        Board board = boardRepo.findOne(boardId);
        if (board == null) {
            throw new NullValueOfArgumentException("Does not exist:", "name");
        }
        boardRepo.delete(boardId);
        return "Board with name: " + boardId + " deleted";
    }
}
