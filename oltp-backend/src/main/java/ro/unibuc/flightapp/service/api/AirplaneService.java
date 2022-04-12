package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Airplane;

public interface AirplaneService {

    Airplane save(Airplane airplane);

    Airplane getOne(long id);

    Iterable<Airplane> getAll();

    void deleteOne(long id);
}
