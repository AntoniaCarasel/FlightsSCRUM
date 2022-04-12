package ro.unibuc.flightapp.web.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import ro.unibuc.flightapp.model.Company;

import java.util.List;

@Getter
@EqualsAndHashCode
@ToString
public class GetCompanyDto {

    private final long id;

    private final String name;

    private final String type;

    private final List<ServiceDto> services;

    public GetCompanyDto(Company company, List<ServiceDto> services) {
        this.id = company.getId();
        this.name = company.getName();
        this.type = company.getType();
        this.services = services;
    }
}
