package ro.unibuc.flightapp.web.dto;

import lombok.Getter;
import ro.unibuc.flightapp.model.Service;

@Getter
public class ServiceDto {

    private final long id;

    private final String name;

    private final double price;

    public ServiceDto(Service service, double price) {
        this.id = service.getId();
        this.name = service.getName();
        this.price = price;
    }
}
