package myGroup.interfaceRepo;

import myGroup.entity.Flight;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Rafael on 20.11.2016.
 */
public interface FlightRepo extends PagingAndSortingRepository<Flight, Integer> {
    //Flight findByName(String name);
}
