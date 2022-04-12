package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Payment;
import ro.unibuc.flightapp.repo.PaymentRepository;
import ro.unibuc.flightapp.service.api.PaymentService;

import java.util.NoSuchElementException;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository repository;

    public PaymentServiceImpl(PaymentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Payment save(Payment payment) {
        return repository.save(payment);
    }

    @Override
    public Payment getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No payment with this ID exists"));
    }

    @Override
    public Iterable<Payment> getAll() {
        return repository.findAll();
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
