package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "oras")
public class City {

    @Id
    @GeneratedValue
    @Column(name = "id_oras")
    private long id;

    @Column(length = 70, name = "nume")
    private String name;

    @ManyToOne
    @JoinColumn(name = "id_tara")
    private Country country;
}
