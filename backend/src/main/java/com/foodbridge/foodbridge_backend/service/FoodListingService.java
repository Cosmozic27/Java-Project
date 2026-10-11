package com.foodbridge.foodbridge_backend.service;

import com.foodbridge.foodbridge_backend.model.FoodListing;
import com.foodbridge.foodbridge_backend.model.enmus.ListingStatus;
import com.foodbridge.foodbridge_backend.repository.FoodListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodListingService {

    @Autowired
    private FoodListingRepository foodListingRepository;

    public List<FoodListing> getAllDonations() {
        return foodListingRepository.findAll();
    }

    public List<FoodListing> getAvailableDonations() {
        return foodListingRepository.findByStatus(ListingStatus.AVAILABLE);
    }

    public List<FoodListing> getDonationsByDonor(Integer donorId) {
        return foodListingRepository.findByDonorId(donorId);
    }

    public FoodListing createDonation(FoodListing donation) {

        if (donation.getDonorId() == null) {
            throw new IllegalArgumentException("Donor ID is required.");
        }

        if (donation.getFoodName() == null
                || donation.getFoodName().isBlank()) {
            throw new IllegalArgumentException("Food name is required.");
        }

        if (donation.getQuantity() == null || donation.getQuantity() <= 0) {
            throw new IllegalArgumentException(
                    "Quantity must be greater than zero."
            );
        }

        donation.setDonationId(null);
        donation.setStatus(ListingStatus.AVAILABLE);

        return foodListingRepository.save(donation);
    }
}