package com.foodbridge.foodbridge_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey signingKey;

    // Token validity: 24 hours
    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000L;

    public JwtService(@Value("${JWT_SECRET:#{null}}") String secretKey) {
        if (secretKey == null || secretKey.trim().isEmpty()) {
            throw new IllegalStateException(
                    "JWT_SECRET environment variable is missing. A secure 256-bit (minimum 32 bytes) signing key is required."
            );
        }

        byte[] keyBytes = secretKey.trim().getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalStateException(
                    "JWT_SECRET environment variable is too weak. The configured HMAC-SHA algorithm requires at least 256 bits (32 bytes)."
            );
        }

        try {
            this.signingKey = Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception exception) {
            throw new IllegalStateException(
                    "JWT_SECRET environment variable is invalid for the configured signing algorithm.",
                    exception
            );
        }
    }

    private SecretKey getSigningKey() {
        return signingKey;
    }

    public String generateToken(Integer userId, String email, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("email", email)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    public Integer extractUserId(String token) {
        return Integer.valueOf(
                extractAllClaims(token).getSubject()
        );
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}