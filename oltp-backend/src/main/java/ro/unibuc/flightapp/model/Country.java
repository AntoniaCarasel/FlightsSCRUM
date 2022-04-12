package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tara")
public class Country {

    @Id
    @GeneratedValue
    @Column(name = "id_tara")
    private long id;

    @Column(length = 70, name = "nume")
    private String name;
}
