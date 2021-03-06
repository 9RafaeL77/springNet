package myGroup.interfaceRepo;

import myGroup.entity.Board;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Created by Rafael on 20.11.2016.
 */
public interface BoardRepo extends PagingAndSortingRepository<Board, Integer> {
    List<Board> findByBoardNameContaining(String boardName);
}
