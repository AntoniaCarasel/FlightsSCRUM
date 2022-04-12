package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Country;
import ro.unibuc.flightapp.service.api.CountryService;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/country")
public class CountryController {

    private final CountryService service;

    public CountryController(CountryService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Country>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Country> save(@RequestBody Country country) {
        return ResponseEntity.status(CREATED).body(service.save(country));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Country %d has been deleted", id));
    }
}
