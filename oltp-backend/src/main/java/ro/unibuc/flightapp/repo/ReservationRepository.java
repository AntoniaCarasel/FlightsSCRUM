package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Reservation;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Long> {
}
