package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Flight;
import ro.unibuc.flightapp.model.Route;

public interface FlightService {

    Flight save(Flight flight);

    Flight getOne(long id);

    Flight getCheapestFlightByRoute(Route route);

    Flight getMostExpensiveFlightByRoute(Route route);

    Iterable<Flight> getAllByRoute(Route route);

    Iterable<Flight> getAll();

    void deleteOne(long id);
}
