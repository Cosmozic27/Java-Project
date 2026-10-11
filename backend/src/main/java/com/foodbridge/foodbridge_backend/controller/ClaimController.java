package com.foodbridge.foodbridge_backend.controller;

import com.foodbridge.foodbridge_backend.model.Claim;
import com.foodbridge.foodbridge_backend.service.ClaimService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    // View all claims
    @GetMapping
    public ResponseEntity<List<Claim>> getAllClaims() {
        return ResponseEntity.ok(claimService.getAllClaims());
    }

    // View claims made by a particular NGO
    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<Claim>> getClaimsByNgo(
            @PathVariable Integer ngoId) {
        return ResponseEntity.ok(
                claimService.getClaimsByNgo(ngoId)
        );
    }

    // View one claim
    @GetMapping("/{claimId}")
    public ResponseEntity<?> getClaimById(
            @PathVariable Integer claimId) {
        try {
            return ResponseEntity.ok(
                    claimService.getClaimById(claimId)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Create a food claim
    @PostMapping
    public ResponseEntity<?> createClaim(
            @RequestBody ClaimRequest request) {
        try {
            Claim claim = claimService.createClaim(
                    request.getDonationId(),
                    request.getNgoId(),
                    request.getClaimedQuantity()
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(claim);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Request body for creating a claim
    public static class ClaimRequest {
        private Integer donationId;
        private Integer ngoId;
        private Integer claimedQuantity;

        public Integer getDonationId() {
            return donationId;
        }

        public void setDonationId(Integer donationId) {
            this.donationId = donationId;
        }

        public Integer getNgoId() {
            return ngoId;
        }

        public void setNgoId(Integer ngoId) {
            this.ngoId = ngoId;
        }

        public Integer getClaimedQuantity() {
            return claimedQuantity;
        }

        public void setClaimedQuantity(Integer claimedQuantity) {
            this.claimedQuantity = claimedQuantity;
        }
    }
}