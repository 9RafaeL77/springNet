package myGroup.interfaceRepo;

import myGroup.entity.Airline;
import org.springframework.data.repository.PagingAndSortingRepository;
import java.util.List;

/**
 * Created by Rafael on 20.11.2016.
 */

public interface AirlineRepo extends PagingAndSortingRepository<Airline, Integer> {
    List<Airline> findByAirlineNameContaining(String airlineName);
    //List<Airline> findByAirlineName();
}
