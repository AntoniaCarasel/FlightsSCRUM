package ro.unibuc.flightapp.service.impl;

import org.springframework.stereotype.Service;
import ro.unibuc.flightapp.model.CompanyService;
import ro.unibuc.flightapp.repo.CompanyServiceRepository;
import ro.unibuc.flightapp.service.api.CompanyServiceService;

import java.util.List;

@Service
public class CompanyServiceServiceImpl implements CompanyServiceService {

    private final CompanyServiceRepository repository;

    public CompanyServiceServiceImpl(CompanyServiceRepository repository) {
        this.repository = repository;
    }

    @Override
    public CompanyService save(CompanyService companyService) {
        return repository.save(companyService);
    }

    @Override
    public List<CompanyService> getAllByCompanyId(long id) {
        return repository.findByCompany_Id(id);
    }
}
