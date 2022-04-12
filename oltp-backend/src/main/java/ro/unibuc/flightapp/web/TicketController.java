package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Ticket;
import ro.unibuc.flightapp.service.api.TicketService;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Ticket>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Ticket> save(@RequestBody Ticket ticket) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(ticket));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Ticket %d has been deleted", id));
    }
}
