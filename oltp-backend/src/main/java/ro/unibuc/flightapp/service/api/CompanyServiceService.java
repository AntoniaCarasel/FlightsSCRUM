package ro.unibuc.flightapp.service.api;

import ro.unibuc.flightapp.model.CompanyService;

import java.util.List;

public interface CompanyServiceService {

    CompanyService save(CompanyService companyService);

    List<CompanyService> getAllByCompanyId(long id);
}
