package com.foodbridge.foodbridge_backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodbridge.foodbridge_backend.controller.AuthController;
import com.foodbridge.foodbridge_backend.dto.LoginRequest;
import com.foodbridge.foodbridge_backend.dto.RegisterRequest;
import com.foodbridge.foodbridge_backend.model.User;
import com.foodbridge.foodbridge_backend.model.enmus.Role;
import com.foodbridge.foodbridge_backend.security.JwtService;
import com.foodbridge.foodbridge_backend.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class AuthControllerSecurityTest {

    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private AuthService authService;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    public void testValidCredentialsLoginReturnsTokenAndUserRole() throws Exception {
        User mockUser = new User();
        mockUser.setUserId(1);
        mockUser.setEmail("admin@foodbridge.org");
        mockUser.setName("System Administrator");
        mockUser.setRole(Role.ADMIN);

        when(authService.login(any(LoginRequest.class))).thenReturn(mockUser);
        when(jwtService.generateToken(any(), any(), any())).thenReturn("mock-jwt-token-xyz");

        LoginRequest request = new LoginRequest();
        request.setEmail("admin@foodbridge.org");
        request.setPassword("Admin@123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login successful"))
                .andExpect(jsonPath("$.token").value("mock-jwt-token-xyz"))
                .andExpect(jsonPath("$.user.email").value("admin@foodbridge.org"))
                .andExpect(jsonPath("$.user.role").value("ADMIN"));
    }

    @Test
    public void testInvalidCredentialsReturns401Unauthorized() throws Exception {
        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new RuntimeException("Invalid email or password."));

        LoginRequest request = new LoginRequest();
        request.setEmail("admin@foodbridge.org");
        request.setPassword("WrongPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid email or password."));
    }

    @Test
    public void testMissingCredentialsReturns400BadRequest() throws Exception {
        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new RuntimeException("Email and password are required."));

        LoginRequest request = new LoginRequest();
        request.setEmail("");
        request.setPassword("");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Email and password are required."));
    }

    @Test
    public void testSuccessfulRegistrationReturns200() throws Exception {
        User newUser = new User();
        newUser.setUserId(2);
        newUser.setEmail("donor@foodbridge.org");
        newUser.setName("Community Kitchen");
        newUser.setRole(Role.DONOR);

        when(authService.register(any(RegisterRequest.class))).thenReturn(newUser);

        RegisterRequest request = new RegisterRequest();
        request.setName("Community Kitchen");
        request.setEmail("donor@foodbridge.org");
        request.setPassword("DonorPass123");
        request.setRole(Role.DONOR);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Registration successful"))
                .andExpect(jsonPath("$.user.email").value("donor@foodbridge.org"))
                .andExpect(jsonPath("$.user.role").value("DONOR"));
    }
}
