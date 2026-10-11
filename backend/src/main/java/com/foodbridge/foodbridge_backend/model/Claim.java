package com.foodbridge.foodbridge_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.foodbridge.foodbridge_backend.model.enmus.ClaimStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "claim_id")
    private Integer claimId;

    @Column(name = "donation_id", nullable = false)
    private Integer donationId;

    @Column(name = "ngo_id", nullable = false)
    private Integer ngoId;

    @Column(name = "claimed_quantity", nullable = false)
    private Integer claimedQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ClaimStatus status = ClaimStatus.REQUESTED;

    @Column(name = "claimed_at", insertable = false, updatable = false)
    private LocalDateTime claimedAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    public Claim() {
    }

    public Integer getClaimId() {
        return claimId;
    }

    public void setClaimId(Integer claimId) {
        this.claimId = claimId;
    }

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

    public ClaimStatus getStatus() {
        return status;
    }

    public void setStatus(ClaimStatus status) {
        this.status = status;
    }

    public LocalDateTime getClaimedAt() {
        return claimedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}