package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Airport;
import ro.unibuc.flightapp.service.api.AirportService;

@RestController
@RequestMapping("/airport")
public class AirportController {

    private final AirportService service;

    public AirportController(AirportService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Airport> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Airport>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Airport> save(@RequestBody Airport airport) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(airport));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Airport %d has been deleted", id));
    }
}
