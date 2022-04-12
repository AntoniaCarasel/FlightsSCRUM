package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Country;

public interface CountryService {

    Country save(Country country);

    Country getOne(long id);

    Iterable<Country> getAll();

    void deleteOne(long id);
}
