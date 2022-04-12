package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Airplane;
import ro.unibuc.flightapp.repo.AirplaneRepository;
import ro.unibuc.flightapp.service.api.AirplaneService;

import java.util.NoSuchElementException;

@Service
public class AirplaneServiceImpl implements AirplaneService {

    private final AirplaneRepository repository;

    public AirplaneServiceImpl(AirplaneRepository repository) {
        this.repository = repository;
    }


    @Override
    public Airplane save(Airplane airplane) {
        return repository.save(airplane);
    }

    @Override
    public Airplane getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No airplane with this ID exists"));
    }

    @Override
    public Iterable<Airplane> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
