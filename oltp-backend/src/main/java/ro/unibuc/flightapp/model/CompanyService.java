package ro.unibuc.flightapp.model;

import lombok.Data;

import javax.persistence.*;

@Data
@IdClass(CompanyServiceId.class)
@Entity(name = "serviciu_companie")
public class CompanyService {

    @Id
    @ManyToOne
    @JoinColumn(name = "id_companie")
    private Company company;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_serviciu")
    private Service service;

    @Column(name = "pret", precision = 6, scale = 2)
    private double price;
}
