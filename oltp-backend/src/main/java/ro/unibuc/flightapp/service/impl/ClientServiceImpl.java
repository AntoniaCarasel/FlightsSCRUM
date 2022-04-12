package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Client;
import ro.unibuc.flightapp.repo.ClientRepository;
import ro.unibuc.flightapp.service.api.ClientService;

import java.util.NoSuchElementException;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository repository;

    public ClientServiceImpl(ClientRepository repository) {
        this.repository = repository;
    }

    @Override
    public Client save(Client client) {
        return repository.save(client);
    }

    @Override
    public Client getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No client with this ID exists"));
    }

    @Override
    public Iterable<Client> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
