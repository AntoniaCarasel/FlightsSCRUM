package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.City;
import ro.unibuc.flightapp.repo.CityRepository;
import ro.unibuc.flightapp.service.api.CityService;

import java.util.NoSuchElementException;

@Service
public class CityServiceImpl implements CityService {

    private final CityRepository repository;

    public CityServiceImpl(CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public City save(City city) {
        return repository.save(city);
    }

    @Override
    public City getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No city with this ID exists"));
    }

    @Override
    public Iterable<City> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
