package ro.unibuc.flightapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.unibuc.flightapp.model.Company;
import ro.unibuc.flightapp.service.api.CompanyService;
import ro.unibuc.flightapp.web.dto.AddServiceDto;
import ro.unibuc.flightapp.web.dto.GetCompanyDto;

import javax.validation.Valid;

@RestController
@RequestMapping("/company")
public class CompanyController {

    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetCompanyDto> getOne(@PathVariable("id") long id) {
        return ResponseEntity.ok().body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<Iterable<Company>> getAll() {
        return ResponseEntity.ok().body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Company> save(@RequestBody Company company) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(company));
    }

    @PutMapping("/{id}/addService")
    public ResponseEntity<String> addService(@Valid @RequestBody AddServiceDto dto, @PathVariable("id") long id) {
        this.service.addService(id, dto.getPrice(), dto.getService());

        return ResponseEntity.ok().body("Service has been added");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable("id") long id) {
        service.deleteOne(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(String.format("Company %d has been deleted", id));
    }
}
