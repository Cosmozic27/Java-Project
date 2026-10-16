package com.foodbridge.foodbridge_backend;

import com.foodbridge.foodbridge_backend.security.JwtService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtServiceTest {

    private static final String STRONG_SECRET =
            "FoodBridgeDevelopmentSecretKey2026SecureKeyEnsure256BitsMinimum";

    @Test
    public void testMissingSecretThrowsIllegalStateException() {
        IllegalStateException exception = assertThrows(
                IllegalStateException.class,
                () -> new JwtService(null)
        );
        assertTrue(exception.getMessage().contains("JWT_SECRET environment variable is missing"));

        IllegalStateException emptyException = assertThrows(
                IllegalStateException.class,
                () -> new JwtService("   ")
        );
        assertTrue(emptyException.getMessage().contains("JWT_SECRET environment variable is missing"));
    }

    @Test
    public void testWeakSecretThrowsIllegalStateException() {
        String weakSecret = "short-secret";
        IllegalStateException exception = assertThrows(
                IllegalStateException.class,
                () -> new JwtService(weakSecret)
        );
        assertTrue(exception.getMessage().contains("JWT_SECRET environment variable is too weak"));
        // Ensure secret value is never printed in error message
        assertFalse(exception.getMessage().contains(weakSecret));
    }

    @Test
    public void testValidSecretCreatesAndValidatesToken() {
        JwtService jwtService = new JwtService(STRONG_SECRET);

        String token = jwtService.generateToken(42, "user@foodbridge.org", "ADMIN");

        assertNotNull(token);
        assertTrue(jwtService.isTokenValid(token));
        assertEquals(42, jwtService.extractUserId(token));
        assertEquals("user@foodbridge.org", jwtService.extractEmail(token));
        assertEquals("ADMIN", jwtService.extractRole(token));
    }
}
