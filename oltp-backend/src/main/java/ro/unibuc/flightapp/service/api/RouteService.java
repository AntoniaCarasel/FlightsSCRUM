package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Route;

public interface RouteService {

    Route save(Route route);

    Route getOne(long id);

    Iterable<Route> getAll();

    void deleteOne(long id);
}
