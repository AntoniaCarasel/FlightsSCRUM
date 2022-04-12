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
@Entity(name = "companie")
public class Company {

    @Id
    @GeneratedValue
    @Column(name = "id_companie")
    private long id;

    @Column(length = 50, name = "nume_companie")
    private String name;

    @Column(length = 50, name = "tip_companie")
    private String type;
}
