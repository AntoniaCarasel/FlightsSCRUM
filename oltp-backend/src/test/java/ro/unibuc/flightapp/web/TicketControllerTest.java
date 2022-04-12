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
import ro.unibuc.flightapp.model.Airplane;
import ro.unibuc.flightapp.model.Reservation;
import ro.unibuc.flightapp.model.Ticket;
import ro.unibuc.flightapp.service.api.TicketService;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class TicketControllerTest {

    private static final String OBJECT_DELETED_TEMPLATE = "Ticket %d has been deleted";
    private static final String REST_API_BASE = "/ticket";

    @Mock
    private TicketService service;

    @InjectMocks
    private TicketController controller;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    private void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void save() throws Exception {
        // Arrange
        var object = new Ticket(1, new Reservation(), new Airplane(), Set.of());

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
        var object = new Ticket(1, new Reservation(), new Airplane(), Set.of());

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
        var object1 = new Ticket(1, new Reservation(), new Airplane(), Set.of());
        var object2 = new Ticket(2, new Reservation(), new Airplane(), Set.of());

        var objects = List.of(object1, object2);

        when(service.getAll()).thenReturn(objects);

        // Act
        var result = mockMvc
                .perform(
                        get(REST_API_BASE)
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
