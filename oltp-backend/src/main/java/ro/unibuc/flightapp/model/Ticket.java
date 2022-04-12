package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "bilet")
public class Ticket {

    @Id
    @GeneratedValue
    @Column(name = "id_bilet")
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_rezervare")
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "id_aeronava")
    private Airplane airplane;

    @ManyToMany
    @JoinTable(name = "serviciu_bilet",
            joinColumns = @JoinColumn(name = "id_bilet"), inverseJoinColumns = @JoinColumn(name = "id_serviciu"))
    private Set<Service> services;
}
