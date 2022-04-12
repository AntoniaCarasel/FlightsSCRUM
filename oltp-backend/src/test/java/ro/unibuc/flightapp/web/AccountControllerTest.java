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
import ro.unibuc.flightapp.model.Account;
import ro.unibuc.flightapp.model.Client;
import ro.unibuc.flightapp.service.api.AccountService;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class AccountControllerTest {

    private static final String ACCOUNT_DELETED_TEMPLATE = "Account %d has been deleted";

    @Mock
    private AccountService service;

    @InjectMocks
    private AccountController controller;

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
        var account = new Account(1, "email", "username", "123", new Client());

        when(service.save(account)).thenReturn(account);

        // Act
        var result = mockMvc
                .perform(
                        post("/account")
                                .content(objectMapper.writeValueAsString(account))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isCreated())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(account));
    }

    @Test
    public void getOne() throws Exception {
        // Arrange
        var id = 1;
        var account = new Account(id, "email", "username", "123", new Client());

        when(service.getOne(id)).thenReturn(account);

        // Act
        var result = mockMvc
                .perform(
                        get(String.format("/account/%d", id))
                )
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(account));
    }

    @Test
    public void getAll() throws Exception {
        // Arrange
        var account1 = new Account(1, "email", "username", "123", new Client());
        var account2 = new Account(2, "email", "username", "123", new Client());

        var accounts = List.of(account1, account2);

        when(service.getAll()).thenReturn(accounts);

        // Act
        var result = mockMvc
                .perform(
                        get("/account")
                )
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(objectMapper.writeValueAsString(accounts));
    }

    @Test
    public void deleteOne() throws Exception {
        // Arrange
        var id = 1;
        var account = new Account(id, "email", "username", "123", new Client());

        // Act
        var result = mockMvc
                .perform(
                        delete(String.format("/account/%d", id))
                )
                .andExpect(status().isNoContent())
                .andReturn();

        // Assert
        assertThat(result.getResponse().getContentAsString()).isEqualTo(String.format(ACCOUNT_DELETED_TEMPLATE, id));
    }

}
