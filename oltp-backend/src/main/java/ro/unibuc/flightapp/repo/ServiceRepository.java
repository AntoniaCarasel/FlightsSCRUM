package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Service;

@Repository
public interface ServiceRepository extends CrudRepository<Service, Long> {
}
