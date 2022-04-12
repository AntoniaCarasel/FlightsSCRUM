package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.City;

@Repository
public interface CityRepository extends CrudRepository<City, Long> {
}
