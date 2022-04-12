package ro.unibuc.flightapp.model;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

@ToString
@EqualsAndHashCode
public class CompanyServiceId implements Serializable {

    private Company company;

    private Service service;

    public CompanyServiceId() {
    }

    public Company getCompany() {
        return this.company;
    }

    public Service getService() {
        return this.service;
    }

    public void setCompany(long companyId) {
        this.company = new Company();
        this.company.setId(companyId);
    }

    public void setService(long serviceId) {
        this.service = new Service();
        this.service.setId(serviceId);
    }

}
