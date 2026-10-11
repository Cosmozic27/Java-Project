package com.foodbridge.foodbridge_backend.repository;

import com.foodbridge.foodbridge_backend.model.Claim;
import com.foodbridge.foodbridge_backend.model.enmus.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Integer> {

    // Find claims made by a particular NGO
    List<Claim> findByNgoId(Integer ngoId);

    // Find claims for a particular food donation
    List<Claim> findByDonationId(Integer donationId);

    // Find claims with a particular status
    List<Claim> findByStatus(ClaimStatus status);
}