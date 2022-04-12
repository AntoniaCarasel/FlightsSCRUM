package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Payment;

public interface PaymentService {

    Payment save(Payment payment);

    Payment getOne(long id);

    Iterable<Payment> getAll();

    void deleteOne(long id);
}
