package com.foodbridge.foodbridge_backend.service;

import com.foodbridge.foodbridge_backend.model.Claim;
import com.foodbridge.foodbridge_backend.model.FoodListing;
import com.foodbridge.foodbridge_backend.model.enmus.ClaimStatus;
import com.foodbridge.foodbridge_backend.model.enmus.ListingStatus;
import com.foodbridge.foodbridge_backend.repository.ClaimRepository;
import com.foodbridge.foodbridge_backend.repository.FoodListingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final FoodListingRepository foodListingRepository;

    public ClaimService(
            ClaimRepository claimRepository,
            FoodListingRepository foodListingRepository) {
        this.claimRepository = claimRepository;
        this.foodListingRepository = foodListingRepository;
    }

    // View all claims
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    // View claims made by a particular NGO
    public List<Claim> getClaimsByNgo(Integer ngoId) {
        return claimRepository.findByNgoId(ngoId);
    }

    // View details of one claim
    public Claim getClaimById(Integer claimId) {
        return claimRepository.findById(claimId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Claim not found."));
    }

    // Create a claim for an available food donation
    @Transactional
    public Claim createClaim(Integer donationId, Integer ngoId,
                             Integer claimedQuantity) {

        if (ngoId == null || ngoId <= 0) {
            throw new IllegalArgumentException("Valid NGO ID is required.");
        }

        if (claimedQuantity == null || claimedQuantity <= 0) {
            throw new IllegalArgumentException(
                    "Claim quantity must be greater than zero.");
        }

        FoodListing donation = foodListingRepository.findById(donationId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Food donation not found."));

        if (donation.getStatus() != ListingStatus.AVAILABLE) {
            throw new IllegalArgumentException(
                    "This food donation is not available.");
        }

        if (claimedQuantity > donation.getQuantity()) {
            throw new IllegalArgumentException(
                    "Claim quantity exceeds the available quantity.");
        }

        Claim claim = new Claim();
        claim.setDonationId(donationId);
        claim.setNgoId(ngoId);
        claim.setClaimedQuantity(claimedQuantity);
        claim.setStatus(ClaimStatus.REQUESTED);

        Claim savedClaim = claimRepository.save(claim);

        donation.setStatus(ListingStatus.CLAIMED);
        foodListingRepository.save(donation);

        return savedClaim;
    }
}