package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Ticket;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {
}
