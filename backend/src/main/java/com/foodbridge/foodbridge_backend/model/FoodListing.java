package com.foodbridge.foodbridge_backend.model;

import com.foodbridge.foodbridge_backend.model.enmus.ListingStatus;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "food_donations")
public class FoodListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_id")
    private Integer donationId;

    @Column(name = "donor_id", nullable = false)
    private Integer donorId;

    @Column(name = "food_name", nullable = false, length = 150)
    private String foodName;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "unit", nullable = false, length = 30)
    private String unit;

    @Column(name = "category", nullable = false, length = 100)
    private String category;

    @Column(name = "dietary", length = 100)
    private String dietary;

    @Column(name = "prepared_at", nullable = false)
    private LocalDateTime preparedAt;

    @Column(name = "consume_before", nullable = false)
    private LocalDateTime consumeBefore;

    @Column(name = "storage_conditions")
    private String storageConditions;

    @Column(name = "allergen_information")
    private String allergenInformation;

    @Column(name = "pickup_location", nullable = false)
    private String pickupLocation;

    @Column(name = "pickup_date", nullable = false)
    private LocalDate pickupDate;

    @Column(name = "pickup_start_time", nullable = false)
    private LocalTime pickupStartTime;

    @Column(name = "pickup_end_time", nullable = false)
    private LocalTime pickupEndTime;

    @Column(name = "description")
    private String description;

    // Uploaded food image URL from Cloudinary
    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ListingStatus status = ListingStatus.AVAILABLE;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    public FoodListing() {
    }

    public Integer getDonationId() {
        return donationId;
    }

    public void setDonationId(Integer donationId) {
        this.donationId = donationId;
    }

    public Integer getDonorId() {
        return donorId;
    }

    public void setDonorId(Integer donorId) {
        this.donorId = donorId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDietary() {
        return dietary;
    }

    public void setDietary(String dietary) {
        this.dietary = dietary;
    }

    public LocalDateTime getPreparedAt() {
        return preparedAt;
    }

    public void setPreparedAt(LocalDateTime preparedAt) {
        this.preparedAt = preparedAt;
    }

    public LocalDateTime getConsumeBefore() {
        return consumeBefore;
    }

    public void setConsumeBefore(LocalDateTime consumeBefore) {
        this.consumeBefore = consumeBefore;
    }

    public String getStorageConditions() {
        return storageConditions;
    }

    public void setStorageConditions(String storageConditions) {
        this.storageConditions = storageConditions;
    }

    public String getAllergenInformation() {
        return allergenInformation;
    }

    public void setAllergenInformation(String allergenInformation) {
        this.allergenInformation = allergenInformation;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }

    public LocalTime getPickupStartTime() {
        return pickupStartTime;
    }

    public void setPickupStartTime(LocalTime pickupStartTime) {
        this.pickupStartTime = pickupStartTime;
    }

    public LocalTime getPickupEndTime() {
        return pickupEndTime;
    }

    public void setPickupEndTime(LocalTime pickupEndTime) {
        this.pickupEndTime = pickupEndTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ListingStatus getStatus() {
        return status;
    }

    public void setStatus(ListingStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}