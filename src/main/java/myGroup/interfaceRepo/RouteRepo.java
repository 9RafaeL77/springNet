package myGroup.interfaceRepo;

import myGroup.entity.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Created by Rafael on 20.11.2016.
 */
//@Service(value = "AirlineRepo")
public interface RouteRepo extends PagingAndSortingRepository<Route, Integer> {
    List<Route> findByRouteFromContaining(String routeFrom);
    List<Route> findByRouteToContaining(String routeTo);
}
