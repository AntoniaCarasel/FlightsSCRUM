package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "aeroport")
public class Airport {

    @Id
    @GeneratedValue
    @Column(name = "id_aeroport")
    private long id;

    @Column(length = 100, name = "denumire")
    private String name;

    @Column(length = 50, name = "IATA_code")
    private String code;

    @ManyToOne
    @JoinColumn(name = "id_oras")
    private City city;
}
