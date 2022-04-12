package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "aeronava")
public class Airplane {

    @Id
    @GeneratedValue
    @Column(name = "id_aeronava")
    private long id;

    @Column(length = 30, name = "numar_inmatriculare")
    private String registrationPlate;

    @Column(length = 4, name = "an_fabricatie")
    private String manufacturingYear;

    @Column(length = 50, name = "producator")
    private String manufacturer;

    @Column(name = "nr_locuri")
    private int noPlaces;

    @ManyToOne
    @JoinColumn(name = "id_companie")
    private Company company;
}
