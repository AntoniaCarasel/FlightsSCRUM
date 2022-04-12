package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Reservation;
import ro.unibuc.flightapp.repo.ReservationRepository;
import ro.unibuc.flightapp.service.api.ReservationService;

import java.util.NoSuchElementException;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository repository;

    public ReservationServiceImpl(ReservationRepository repository) {
        this.repository = repository;
    }

    @Override
    public Reservation save(Reservation reservation) {
        return repository.save(reservation);
    }

    @Override
    public Reservation getOne(long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("No reservation with this ID exists"));
    }

    @Override
    public Iterable<Reservation> getAll() {
        return repository.findAll();    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
