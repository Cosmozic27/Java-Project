package com.foodbridge.foodbridge_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private Cloudinary getCloudinary() {
        String cloudinaryUrl = System.getenv("CLOUDINARY_URL");

        if (cloudinaryUrl == null || cloudinaryUrl.isBlank()) {
            throw new IllegalStateException(
                "CLOUDINARY_URL environment variable is not configured."
            );
        }

        return new Cloudinary(cloudinaryUrl);
    }

    public String uploadImage(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select an image.");
        }

        // Allow only image files.
        String contentType = file.getContentType();

        if (contentType == null ||
                !contentType.toLowerCase().startsWith("image/")) {
            throw new IllegalArgumentException(
                "Only image files are allowed."
            );
        }

        // Limit image size to 5 MB.
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException(
                "Image size must be less than 5 MB."
            );
        }

        Map<?, ?> result = getCloudinary()
                .uploader()
                .upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                        "resource_type", "image",
                        "folder", "foodbridge"
                    )
                );

        Object imageUrl = result.get("secure_url");

        if (imageUrl == null) {
            throw new IOException("Cloudinary did not return an image URL.");
        }

        return imageUrl.toString();
    }
}
