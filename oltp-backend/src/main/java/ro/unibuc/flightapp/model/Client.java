package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "client")
public class Client {

    @Id
    @GeneratedValue
    @Column(name = "id_client")
    private long id;

    @Column(length = 50, name = "prenume")
    private String firstName;

    @Column(length = 50, name = "nume")
    private String lastName;

    @Column(length = 15, name = "telefon")
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "id_tara")
    private Country country;
}
