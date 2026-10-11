package com.foodbridge.foodbridge_backend.controller;

import com.foodbridge.foodbridge_backend.model.FoodListing;
import com.foodbridge.foodbridge_backend.service.NgoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ngo")
@CrossOrigin(origins = "http://localhost:5173")
public class NgoController {

    private final NgoService ngoService;

    public NgoController(NgoService ngoService) {
        this.ngoService = ngoService;
    }

    // View all available food donations
    @GetMapping("/food")
    public ResponseEntity<List<FoodListing>> getAvailableFood() {
        return ResponseEntity.ok(ngoService.getAvailableFood());
    }

    // View details of a particular food donation
    @GetMapping("/food/{donationId}")
    public ResponseEntity<?> getDonationById(
            @PathVariable Integer donationId) {

        try {
            return ResponseEntity.ok(
                    ngoService.getDonationById(donationId)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404)
                    .body(java.util.Map.of("error", e.getMessage()));
        }
    }
}