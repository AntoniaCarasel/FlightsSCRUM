package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.Company;
import ro.unibuc.flightapp.web.dto.GetCompanyDto;

public interface CompanyService {

    Company save(Company company);

    GetCompanyDto getOne(long id);

    Iterable<Company> getAll();

    void addService(long id, double price, ro.unibuc.flightapp.model.Service service);

    void deleteOne(long id);
}
