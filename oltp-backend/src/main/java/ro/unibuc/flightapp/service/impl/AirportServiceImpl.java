package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Airport;
import ro.unibuc.flightapp.repo.AirportRepository;
import ro.unibuc.flightapp.service.api.AirportService;

import java.util.NoSuchElementException;

@Service
public class AirportServiceImpl implements AirportService {

    private final AirportRepository repository;

    public AirportServiceImpl(AirportRepository repository) {
        this.repository = repository;
    }

    @Override
    public Airport save(Airport airport) {
        return repository.save(airport);
    }

    @Override
    public Airport getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No airport with this ID exists"));
    }

    @Override
    public Iterable<Airport> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
