package com.foodbridge.foodbridge_backend.config;

import com.foodbridge.foodbridge_backend.model.User;
import com.foodbridge.foodbridge_backend.model.enmus.Role;
import com.foodbridge.foodbridge_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                User donor = new User();
                donor.setName("Demo Donor");
                donor.setEmail("donor@foodbridge.com");
                donor.setPassword(passwordEncoder.encode("password123"));
                donor.setRole(Role.DONOR);
                userRepository.save(donor);

                User ngo = new User();
                ngo.setName("Demo NGO");
                ngo.setEmail("ngo@foodbridge.com");
                ngo.setPassword(passwordEncoder.encode("password123"));
                ngo.setRole(Role.NGO);
                userRepository.save(ngo);
            }
        };
    }
}
