package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
}
