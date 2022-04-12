package ro.unibuc.flightapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ruta")
public class Route {

    @Id
    @GeneratedValue
    @Column(name = "id_ruta")
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_aeroport_plecare")
    private Airport departingAirport;

    @ManyToOne
    @JoinColumn(name = "id_aeroport_sosire")
    private Airport arrivingAirport;
}
