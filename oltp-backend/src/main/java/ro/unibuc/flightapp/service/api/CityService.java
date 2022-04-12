package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.City;

public interface CityService {

    City save(City city);

    City getOne(long id);

    Iterable<City> getAll();

    void deleteOne(long id);
}
