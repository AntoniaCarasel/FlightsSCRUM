package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Country;

@Repository
public interface CountryRepository extends CrudRepository<Country, Long> {
}
