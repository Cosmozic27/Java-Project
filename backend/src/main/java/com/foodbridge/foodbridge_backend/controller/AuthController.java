package com.foodbridge.foodbridge_backend.controller;

import com.foodbridge.foodbridge_backend.dto.LoginRequest;
import com.foodbridge.foodbridge_backend.dto.RegisterRequest;
import com.foodbridge.foodbridge_backend.model.User;
import com.foodbridge.foodbridge_backend.security.JwtService;
import com.foodbridge.foodbridge_backend.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.register(request);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("user", user);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.login(request);

            String token = jwtService.generateToken(
                    user.getUserId(),
                    user.getEmail(),
                    user.getRole().name()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("user", user);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get the currently logged-in user's profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            User user = getAuthenticatedUser(authentication);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Update the currently logged-in user's profile
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @RequestBody Map<String, String> request) {

        try {
            User currentUser = getAuthenticatedUser(authentication);

            User updatedUser = authService.updateProfile(
        currentUser.getUserId(),
        request.get("name"),
        request.get("contactPerson"),
        request.get("organizationType"),
        request.get("phone"),
        request.get("address")
);

            return ResponseEntity.ok(updatedUser);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    private User getAuthenticatedUser(Authentication authentication) {
        if (authentication == null
                || !authentication.isAuthenticated()
                || !(authentication.getPrincipal() instanceof User)) {
            throw new RuntimeException("Please log in to access your profile.");
        }

        return (User) authentication.getPrincipal();
    }
}