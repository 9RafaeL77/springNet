package myGroup.interfaceRepo;

import myGroup.entity.Users;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by Rafael on 20.11.2016.
 */
public interface UsersRepo extends PagingAndSortingRepository<Users, Integer> {
}
