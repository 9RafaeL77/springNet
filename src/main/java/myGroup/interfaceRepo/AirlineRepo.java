package myGroup.interfaceRepo;

import myGroup.entity.Airline;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

/**
 * Created by Rafael on 20.11.2016.
 */
@Service(value = "AirlineRepo") //как задать имя спринг бину через аннотации
public interface AirlineRepo extends PagingAndSortingRepository<Airline, Integer> {
}