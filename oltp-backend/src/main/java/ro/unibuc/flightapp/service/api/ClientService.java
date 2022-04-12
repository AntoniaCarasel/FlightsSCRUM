package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Client;


public interface ClientService {

    Client save(Client client);

    Client getOne(long id);

    Iterable<Client> getAll();

    void deleteOne(long id);
}
