package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Airplane;
import ro.unibuc.flightapp.service.api.AirplaneService;

@RestController
@RequestMapping("/airplane")
public class AirplaneController {

    private final AirplaneService service;

    public AirplaneController(AirplaneService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Airplane> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Airplane>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Airplane> save(@RequestBody Airplane airplane) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(airplane));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Airplane %d has been deleted", id));
    }
}
