package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Service;

public interface ServiceService {

    Service save(Service service);

    Service getOne(long id);

    Iterable<Service> getAll();

    void deleteOne(long id);
}
