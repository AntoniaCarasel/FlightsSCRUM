package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.Company;
import ro.unibuc.flightapp.repo.CompanyRepository;
import ro.unibuc.flightapp.service.api.CompanyService;
import ro.unibuc.flightapp.service.api.CompanyServiceService;
import ro.unibuc.flightapp.web.dto.GetCompanyDto;
import ro.unibuc.flightapp.web.dto.ServiceDto;

import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository repository;
    private final CompanyServiceService companyServiceService;

    public CompanyServiceImpl(CompanyRepository repository, CompanyServiceService companyServiceService) {
        this.repository = repository;
        this.companyServiceService = companyServiceService;
    }

    @Override
    public Company save(Company company) {
        return repository.save(company);
    }

    @Override
    public GetCompanyDto getOne(long id) {
        var company = repository.findById(id).orElseThrow(() -> new NoSuchElementException("No company with this ID exists"));
        var companyServices = companyServiceService.getAllByCompanyId(id);

        var services = companyServices.stream()
                .map(companyService -> {
                    var price = companyService.getPrice();
                    var service = companyService.getService();

                    return new ServiceDto(service, price);
                })
                .collect(Collectors.toList());

        return new GetCompanyDto(company, services);
    }

    @Override
    public Iterable<Company> getAll() {
        return repository.findAll();
    }

    @Override
    public void addService(long id, double price, ro.unibuc.flightapp.model.Service service) {
        var company = repository.findById(id).orElseThrow(() -> new NoSuchElementException("No company with this ID exists"));

        var companyService = new ro.unibuc.flightapp.model.CompanyService();
        companyService.setService(service);
        companyService.setCompany(company);
        companyService.setPrice(price);
        companyServiceService.save(companyService);
    }

    @Override
    public void deleteOne(long id) {
        repository.deleteById(id);
    }
}
