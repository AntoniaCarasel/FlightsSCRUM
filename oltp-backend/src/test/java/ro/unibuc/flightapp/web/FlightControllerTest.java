package ro.unibuc.flightapp.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import ro.unibuc.flightapp.model.Company;
import ro.unibuc.flightapp.model.Flight;
import ro.unibuc.flightapp.model.Route;
import ro.unibuc.flightapp.service.api.FlightService;

import java.sql.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class FlightControllerTest {

    private static final String OBJECT_DELETED_TEMPLATE = "Flight %d has been deleted";
    private static final String REST_API_BASE = "/flight";

    @Mock
    private FlightService service;

    @InjectMocks
    private FlightController controller;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    private void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void getAllByRoute() throws Exception {
        // Arrange
        var route = new Route(1, null, null);
        var object = new Flight(1, "etd", "eta", 12.1, new Date(System.currentTimeMillis()), route, new Company());

        when(service.getAllByRoute(route)).thenReturn(List.of(object));

        // Act
        var result = mockMvc
                .perform(
                        put(REST_API_BASE)
                                .content(objectMapper.writeValueAsString(object))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(List.of(object)));
    }

    @Test
    public void getCheapestByRoute() throws Exception {
        // Arrange
        var route = new Route(1, null, null);
        var object = new Flight(1, "etd", "eta", 12.1, new Date(System.currentTimeMillis()), route, new Company());

        when(service.getCheapestFlightByRoute(route)).thenReturn(object);

        // Act
        var result = mockMvc
                .perform(
                        get(REST_API_BASE + "/cheapByRoute")
                                .content(objectMapper.writeValueAsString(object))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(object));
    }

    @Test
    public void getMostExpensiveByRoute() throws Exception {
        // Arrange
        var route = new Route(1, null, null);
        var object = new Flight(1, "etd", "eta", 12.1, new Date(System.currentTimeMillis()), route, new Company());

        when(service.getMostExpensiveFlightByRoute(route)).thenReturn(object);

        // Act
        var result = mockMvc
                .perform(
                        get(REST_API_BASE + "/expensiveByRoute")
                                .content(objectMapper.writeValueAsString(object))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(object));
    }

    @Test
    public void save() throws Exception {
        // Arrange
        var object = new Flight(1, "etd", "eta", 12.1, new Date(System.currentTimeMillis()), new Route(), new Company());

        when(service.save(object)).thenReturn(object);

        // Act
        var result = mockMvc
                .perform(
                        post(REST_API_BASE)
                                .content(objectMapper.writeValueAsString(object))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isCreated())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(object));
    }

    @Test
    public void getOne() throws Exception {
        // Arrange
        var id = 1;
        var object = new Flight(1, "etd", "eta", 12.1, new Date(System.currentTimeMillis()), new Route(), new Company());

        when(service.getOne(id)).thenReturn(object);

        // Act
        var result = mockMvc
                .perform(
                        get(REST_API_BASE + "/" + id)
                )
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(object));
    }

    @Test
    public void getAll() throws Exception {
        // Arrange
        var object1 = new Flight(1, "etd", "eta", 12.1, new Date(System.currentTimeMillis()), new Route(), new Company());
        var object2 = new Flight(2, "etd", "eta", 12.1, new Date(System.currentTimeMillis()), new Route(), new Company());

        var objects = List.of(object1, object2);

        when(service.getAll()).thenReturn(objects);

        // Act
        var result = mockMvc
                .perform(
                        get(REST_API_BASE + "/all")
                )
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(objects));
    }

    @Test
    public void deleteOne() throws Exception {
        // Arrange
        var id = 1;

        // Act
        var result = mockMvc
                .perform(
                        delete(REST_API_BASE + "/" + id)
                )
                .andExpect(status().isNoContent())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(String.format(OBJECT_DELETED_TEMPLATE, id));
    }

}
