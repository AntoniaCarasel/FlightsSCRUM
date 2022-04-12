package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Country;
import ro.unibuc.flightapp.repo.CountryRepository;
import ro.unibuc.flightapp.service.api.CountryService;

import java.util.NoSuchElementException;

@Service
public class CountryServiceImpl implements CountryService {

    private final CountryRepository repository;

    public CountryServiceImpl(CountryRepository repository) {
        this.repository = repository;
    }


    @Override
    public Country save(Country country) {
        return repository.save(country);
    }

    @Override
    public Country getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No country with this ID exists"));
    }

    @Override
    public Iterable<Country> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
