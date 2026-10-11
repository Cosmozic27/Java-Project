package com.foodbridge.foodbridge_backend.service;

import com.foodbridge.foodbridge_backend.dto.LoginRequest;
import com.foodbridge.foodbridge_backend.dto.RegisterRequest;
import com.foodbridge.foodbridge_backend.model.User;
import com.foodbridge.foodbridge_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {

        if (request.getName() == null || request.getName().isBlank()) {
            throw new RuntimeException("Organization name is required.");
        }

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("Email is required.");
        }

        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters.");
        }

        if (request.getRole() == null) {
            throw new RuntimeException("Role is required.");
        }

        if (userRepository.existsByEmail(request.getEmail().trim())) {
            throw new RuntimeException("Email is already registered.");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {

        if (request.getEmail() == null || request.getPassword() == null) {
            throw new RuntimeException("Email and password are required.");
        }

        User user = userRepository.findByEmail(request.getEmail().trim())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password."));

        if (!passwordEncoder.matches(
                request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password.");
        }

        return user;
    }

    
        public User updateProfile(
        Integer userId,
        String name,
        String contactPerson,
        String organizationType,
        String phone,
        String address) {

    User user = userRepository.findById(userId)
            .orElseThrow(() ->
                    new RuntimeException("User not found."));

    if (name == null || name.isBlank()) {
        throw new RuntimeException("Organization name is required.");
    }

    user.setName(name.trim());

    user.setContactPerson(
            contactPerson == null ? null : contactPerson.trim());

    user.setOrganizationType(
            organizationType == null ? null : organizationType.trim());

    user.setPhone(
            phone == null ? null : phone.trim());

    user.setAddress(
            address == null ? null : address.trim());

    return userRepository.save(user);
}
}
