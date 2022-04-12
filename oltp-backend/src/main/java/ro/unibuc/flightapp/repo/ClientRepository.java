package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Client;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
}
