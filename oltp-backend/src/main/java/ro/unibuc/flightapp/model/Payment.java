package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "plata")
public class Payment {

    @Id
    @GeneratedValue
    @Column(name = "id_plata")
    private long id;

    @Column(name = "data")
    private Date date;

    @Column(length = 20, name = "tip")
    private String type;

    @Column(length = 50, name = "IBAN")
    private String accountNumber;

    @ManyToOne
    @JoinColumn(name = "id_rezervare")
    private Reservation reservation;
}
