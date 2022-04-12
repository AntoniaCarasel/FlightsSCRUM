package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Airport;

@Repository
public interface AirportRepository extends CrudRepository<Airport, Long> {
}
