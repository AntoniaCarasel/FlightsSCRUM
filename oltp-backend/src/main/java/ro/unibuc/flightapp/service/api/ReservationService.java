package ro.unibuc.flightapp.service.api;


import ro.unibuc.flightapp.model.Reservation;

public interface ReservationService {

    Reservation save(Reservation reservation);

    Reservation getOne(long id);

    Iterable<Reservation> getAll();

    void deleteOne(long id);
}
