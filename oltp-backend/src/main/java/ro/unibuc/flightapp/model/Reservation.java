package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "rezervare")
public class Reservation {

    @Id
    @GeneratedValue
    @Column(name = "id_rezervare")
    private long id;

    @Column(name = "descriere", length = 50)
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_cont")
    private Account account;

    @Column(name = "data_rezervare")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "id_zbor")
    private Flight flight;
}
