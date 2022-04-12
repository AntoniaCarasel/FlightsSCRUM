package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Airplane;

@Repository
public interface AirplaneRepository extends CrudRepository<Airplane, Long> {
}
