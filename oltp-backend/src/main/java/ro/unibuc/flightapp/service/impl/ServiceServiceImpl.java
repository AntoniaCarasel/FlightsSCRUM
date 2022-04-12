package ro.unibuc.flightapp.service.impl;

import ro.unibuc.flightapp.model.Service;
import ro.unibuc.flightapp.repo.ServiceRepository;
import ro.unibuc.flightapp.service.api.ServiceService;

import java.util.NoSuchElementException;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository repository;

    public ServiceServiceImpl(ServiceRepository repository) {
        this.repository = repository;
    }

    @Override
    public Service save(Service service) {
        return repository.save(service);
    }

    @Override
    public Service getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No service with this ID exists"));
    }

    @Override
    public Iterable<Service> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
