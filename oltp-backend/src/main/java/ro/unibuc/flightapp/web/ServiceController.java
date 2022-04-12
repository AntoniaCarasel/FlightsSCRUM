package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Service;
import ro.unibuc.flightapp.service.api.ServiceService;

@RestController
@RequestMapping("/service")
public class ServiceController {

    private final ServiceService service;

    public ServiceController(ServiceService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Service> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Service>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Service> save(@RequestBody Service service) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(service));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Service %d has been deleted", id));
    }
}
