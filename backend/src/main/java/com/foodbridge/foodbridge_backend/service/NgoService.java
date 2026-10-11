package com.foodbridge.foodbridge_backend.service;

import com.foodbridge.foodbridge_backend.model.FoodListing;
import com.foodbridge.foodbridge_backend.model.enmus.ListingStatus;
import com.foodbridge.foodbridge_backend.repository.FoodListingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NgoService {

    private final FoodListingRepository foodListingRepository;

    public NgoService(FoodListingRepository foodListingRepository) {
        this.foodListingRepository = foodListingRepository;
    }

    public List<FoodListing> getAvailableFood() {
        return foodListingRepository.findByStatus(ListingStatus.AVAILABLE);
    }

    public FoodListing getDonationById(Integer id) {
        return foodListingRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Food donation not found."));
    }
}