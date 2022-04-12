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
@Entity(name = "serviciu")
public class Service {

    @Id
    @GeneratedValue
    @Column(name = "id_serviciu")
    private long id;

    @Column(length = 50, name = "nume")
    private String name;

    @Column(length = 50, name = "descriere")
    private String description;
}
