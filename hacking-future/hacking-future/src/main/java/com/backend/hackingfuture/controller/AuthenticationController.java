package com.backend.hackingfuture.controller;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.hackingfuture.entity.UserEntity;
import com.backend.hackingfuture.repository.UserRepository;

@RestController
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/api/v1/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        if (isValidCredentials(email, password)) {
            String role = getUserRoleByEmailId(email);
            String Name = getUserNameByEmailId(email);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "Authentication successful");
            responseBody.put("role", role);
            responseBody.put("Name", Name);
            responseBody.put("email", email);

            return ResponseEntity.ok().body(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
        }
    }

    private String getUserRoleByEmailId(String emailId) {
        Optional<UserEntity> userOptional = userRepository.findByEmailId(emailId);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            return user.getRole();
        } else {
            return null;
        }
    }

    private String getUserNameByEmailId(String emailId) {
        Optional<UserEntity> userOptional = userRepository.findByEmailId(emailId);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            return user.getFirstName() + " " + user.getLastName();
        } else {
            return null;
        }
    }

    private boolean isValidCredentials(String email, String password) {
        Optional<UserEntity> userOptional = userRepository.findByEmailId(email);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            String storedHashedPassword = user.getPassword();
            return checkPassword(password, storedHashedPassword);
        } else {
            return false;
        }
    }

    private boolean checkPassword(String password, String storedHashedPassword) {
        String hashedPassword = hashPassword(password);
        return hashedPassword.equals(storedHashedPassword);
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
