package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Flight;
import ro.unibuc.flightapp.model.Route;
import ro.unibuc.flightapp.repo.FlightRepository;
import ro.unibuc.flightapp.service.api.FlightService;

import java.util.NoSuchElementException;

@Service
public class FlightServiceImpl implements FlightService {

    private final FlightRepository repository;

    public FlightServiceImpl(FlightRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flight save(Flight flight) {
        return repository.save(flight);
    }

    @Override
    public Flight getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No flight with this ID exists"));
    }

    @Override
    public Flight getCheapestFlightByRoute(Route route) {
        return repository.findFirstByRouteOrderByPriceAsc(route)
                .orElseThrow(() -> new NoSuchElementException("No flight with this ID exists"));
    }

    @Override
    public Flight getMostExpensiveFlightByRoute(Route route) {
        return repository.findFirstByRouteOrderByPriceDesc(route)
                .orElseThrow(() -> new NoSuchElementException("No flight with this ID exists"));
    }

    @Override
    public Iterable<Flight> getAllByRoute(Route route) {
        return repository.findAllByRouteOrderByPriceAsc(route);
    }

    @Override
    public Iterable<Flight> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
