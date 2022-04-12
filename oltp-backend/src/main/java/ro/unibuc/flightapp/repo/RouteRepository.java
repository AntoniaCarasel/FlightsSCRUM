package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Route;

@Repository
public interface RouteRepository extends CrudRepository<Route, Long> {
}
