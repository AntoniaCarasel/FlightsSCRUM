package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Ticket;
import ro.unibuc.flightapp.repo.TicketRepository;
import ro.unibuc.flightapp.service.api.TicketService;

import java.util.NoSuchElementException;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository repository;

    public TicketServiceImpl(TicketRepository repository) {
        this.repository = repository;
    }

    @Override
    public Ticket save(Ticket ticket) {
        return repository.save(ticket);
    }

    @Override
    public Ticket getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No ticket with this ID exists"));
    }

    @Override
    public Iterable<Ticket> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
