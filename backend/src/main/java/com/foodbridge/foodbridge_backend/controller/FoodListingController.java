package com.foodbridge.foodbridge_backend.controller;

import com.foodbridge.foodbridge_backend.model.FoodListing;
import com.foodbridge.foodbridge_backend.service.FoodListingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodListingController {

    private final FoodListingService foodListingService;

    public FoodListingController(FoodListingService foodListingService) {
        this.foodListingService = foodListingService;
    }

    // Get all donations
    @GetMapping
    public ResponseEntity<List<FoodListing>> getAllDonations() {
        return ResponseEntity.ok(
                foodListingService.getAllDonations()
        );
    }

    // Get available donations
    @GetMapping("/available")
    public ResponseEntity<List<FoodListing>> getAvailableDonations() {
        return ResponseEntity.ok(
                foodListingService.getAvailableDonations()
        );
    }

    // Get donations belonging to a donor
    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<FoodListing>> getDonationsByDonor(
            @PathVariable Integer donorId) {

        return ResponseEntity.ok(
                foodListingService.getDonationsByDonor(donorId)
        );
    }

    // Create a donation
    @PostMapping
    public ResponseEntity<?> createDonation(
            @RequestBody FoodListing donation) {

        try {
            FoodListing savedDonation =
                    foodListingService.createDonation(donation);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedDonation);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(java.util.Map.of("error", e.getMessage()));
        }
    }
}