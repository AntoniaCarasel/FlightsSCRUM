package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Airport;

public interface AirportService {

    Airport save(Airport airport);

    Airport getOne(long id);

    Iterable<Airport> getAll();

    void deleteOne(long id);
}
