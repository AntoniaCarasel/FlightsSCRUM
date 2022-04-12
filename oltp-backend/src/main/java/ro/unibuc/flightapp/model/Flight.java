package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "zbor")
public class Flight {

    @Id
    @GeneratedValue
    @Column(name = "id_zbor")
    private long id;

    @Column(name = "etd", length = 8)
    private String etd;

    @Column(name = "eta", length = 8)
    private String eta;

    @Column(name = "BASEFEE", precision = 6, scale = 2)
    private double price;

    @Column(name = "data_zbor")
    private Date flightDate;

    @ManyToOne
    @JoinColumn(name = "id_ruta")
    private Route route;

    @ManyToOne
    @JoinColumn(name = "id_companie")
    private Company company;
}
