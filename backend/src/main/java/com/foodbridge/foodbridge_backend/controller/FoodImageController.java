package com.foodbridge.foodbridge_backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Locale;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/food")
public class FoodImageController {

    private static final long MAX_FILE_SIZE = 5L * 1024 * 1024;

    private static final Set<String> ALLOWED_TYPES = Set.of(
        "image/jpeg",
        "image/png",
        "image/webp"
    );

    private final Cloudinary cloudinary;

    public FoodImageController(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @PreAuthorize("hasRole('DONOR')")
    @PostMapping(
        value = "/upload-image",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Please select an image."));
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.badRequest()
                .body(Map.of(
                    "error",
                    "Image must be 5 MB or smaller."
                ));
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                !ALLOWED_TYPES.contains(
                    contentType.toLowerCase(Locale.ROOT)
                )) {
            return ResponseEntity.badRequest()
                .body(Map.of(
                    "error",
                    "Upload a JPEG, PNG, or WebP image."
                ));
        }

        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                    "folder", "foodbridge/donations",
                    "resource_type", "image"
                )
            );

            Object secureUrl = result.get("secure_url");

            if (secureUrl == null) {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("error", "Image upload failed."));
            }

            return ResponseEntity.ok(
                Map.of("imageUrl", secureUrl.toString())
            );

        } catch (Exception exception) {
            // Keep internal exception details out of the API response.
            return ResponseEntity.status(
                HttpStatus.INTERNAL_SERVER_ERROR
            ).body(Map.of(
                "error",
                "Unable to upload image. Please try again."
            ));
        }
    }
}
