package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Client;
import ro.unibuc.flightapp.service.api.ClientService;

@RestController
@RequestMapping("/client")
public class ClientController {

    private final ClientService service;


    public ClientController(ClientService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Client>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Client> save(@RequestBody Client client) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(client));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Client %d has been deleted", id));
    }
}
