package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Ticket;

public interface TicketService {

    Ticket save(Ticket ticket);

    Ticket getOne(long id);

    Iterable<Ticket> getAll();

    void deleteOne(long id);
}
