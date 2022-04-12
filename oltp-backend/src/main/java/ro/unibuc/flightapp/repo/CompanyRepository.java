package ro.unibuc.flightapp.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.unibuc.flightapp.model.Company;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
}
