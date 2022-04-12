package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Flight;
import ro.unibuc.flightapp.model.Route;

import java.util.Optional;

@Repository
public interface FlightRepository extends CrudRepository<Flight, Long> {

    Optional<Flight> findFirstByRouteOrderByPriceDesc(Route route);

    Optional<Flight> findFirstByRouteOrderByPriceAsc(Route route);

    Iterable<Flight> findAllByRouteOrderByPriceAsc(Route route);
}
