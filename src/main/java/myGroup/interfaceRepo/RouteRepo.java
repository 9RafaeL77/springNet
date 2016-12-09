package myGroup.interfaceRepo;

import myGroup.entity.Route;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Rafael on 20.11.2016.
 */
public interface RouteRepo extends PagingAndSortingRepository<Route, Integer> {
}
