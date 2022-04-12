package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Route;
import ro.unibuc.flightapp.repo.RouteRepository;
import ro.unibuc.flightapp.service.api.RouteService;

import java.util.NoSuchElementException;

@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository repository;

    public RouteServiceImpl(RouteRepository repository) {
        this.repository = repository;
    }

    @Override
    public Route save(Route route) {
        return repository.save(route);
    }

    @Override
    public Route getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No route with this ID exists"));
    }

    @Override
    public Iterable<Route> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
