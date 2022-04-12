package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Account;
import ro.unibuc.flightapp.service.api.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Account>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Account> save(@RequestBody Account account) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(account));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Account %d has been deleted", id));
    }
}
