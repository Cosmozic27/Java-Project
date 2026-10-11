package com.foodbridge.foodbridge_backend.repository;

import com.foodbridge.foodbridge_backend.model.FoodListing;
import com.foodbridge.foodbridge_backend.model.enmus.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodListingRepository extends JpaRepository<FoodListing, Integer> {

    List<FoodListing> findByStatus(ListingStatus status);

    List<FoodListing> findByDonorId(Integer donorId);
}