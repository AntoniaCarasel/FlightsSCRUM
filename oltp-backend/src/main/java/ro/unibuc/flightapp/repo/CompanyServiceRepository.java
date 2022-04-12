package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import ro.unibuc.flightapp.model.CompanyService;
import ro.unibuc.flightapp.model.CompanyServiceId;

import java.util.List;

public interface CompanyServiceRepository extends CrudRepository<CompanyService, CompanyServiceId> {

    List<CompanyService> findByCompany_Id(long id);

}
