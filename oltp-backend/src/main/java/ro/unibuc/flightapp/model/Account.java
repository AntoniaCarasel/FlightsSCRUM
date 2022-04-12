package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "cont")
public class Account {

    @Id
    @GeneratedValue
    @Column(name = "id_cont")
    private long id;

    @Column(length = 50, name = "email")
    private String email;

    @Column(length = 30, name = "username")
    private String username;

    @Column(length = 30, name = "parola")
    private String password;

    @ManyToOne
    @JoinColumn(name = "id_client")
    private Client client;
}
