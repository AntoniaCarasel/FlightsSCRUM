package ro.unibuc.flightapp.web.dto;

import lombok.Data;
import ro.unibuc.flightapp.model.Service;

import javax.validation.constraints.DecimalMin;

@Data
public class AddServiceDto {

    private Service service;

    @DecimalMin(value = "0.0", inclusive = false)
    private double price;
}
