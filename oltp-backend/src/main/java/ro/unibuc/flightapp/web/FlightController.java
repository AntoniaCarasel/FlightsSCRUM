package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Flight;
import ro.unibuc.flightapp.model.Route;
import ro.unibuc.flightapp.service.api.FlightService;

@RestController
@RequestMapping("/flight")
public class FlightController {

    private final FlightService service;

    public FlightController(FlightService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Flight>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PutMapping
    public ResponseEntity<Iterable<Flight>> getAllByRoute(@RequestBody Route route) {
        return ResponseEntity.ok().body(service.getAllByRoute(route));
    }

    @GetMapping("/cheapByRoute")
    public ResponseEntity<Flight> getCheapestByRoute(@RequestBody Route route) {
        return ResponseEntity.ok().body(service.getCheapestFlightByRoute(route));
    }

    @GetMapping("/expensiveByRoute")
    public ResponseEntity<Flight> getMostExpensiveByRoute(@RequestBody Route route) {
        return ResponseEntity.ok().body(service.getMostExpensiveFlightByRoute(route));
    }

    @PostMapping
    public ResponseEntity<Flight> save(@RequestBody Flight flight) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(flight));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Flight %d has been deleted", id));
    }
}
