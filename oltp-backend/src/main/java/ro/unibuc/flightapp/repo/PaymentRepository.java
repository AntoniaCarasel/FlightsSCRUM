package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Payment;

@Repository
public interface PaymentRepository extends CrudRepository<Payment, Long> {
}
