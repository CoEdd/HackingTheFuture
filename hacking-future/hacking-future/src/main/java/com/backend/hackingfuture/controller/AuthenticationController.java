package com.backend.hackingfuture.controller;

import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

// import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.hackingfuture.entity.UserEntity;
// import com.backend.hackingfuture.model.User;
import com.backend.hackingfuture.repository.UserRepository;

@RestController
// @ComponentScan(basePackages = "com.backend.hackingfuture.controller")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    // @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/api/v1/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        // Your authentication logic here
        if (isValidCredentials(email, password)) {
            // Fetch user role from the database based on email
            String role = getUserRoleByEmailId(email);
            String Name = getUserNameByEmailId(email);

            // Construct response object with role information
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "Authentication successful" );
            responseBody.put("role", role);
            responseBody.put("Name", Name);
            responseBody.put("email", email);

            return ResponseEntity.ok().body(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
        }
    }

    // @SuppressWarnings("unused")
    private String getUserRoleByEmailId(String emailId) {
        // Implement logic to fetch user role from the database based on email
        Optional<UserEntity> userOptional = userRepository.findByEmailId(emailId);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            // Assuming the UserEntity has a field named 'role', you can return it directly
            return user.getRole() ; // Assuming 'role' is a String field in the UserEntity
        } else {
            // If user with the provided email doesn't exist, return null or handle it accordingly
            return null;
        }
    }

    // @SuppressWarnings("unused")
    private String getUserNameByEmailId(String emailId) {
        // Implement logic to fetch user role from the database based on email
        Optional<UserEntity> userOptional = userRepository.findByEmailId(emailId);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            // Assuming the UserEntity has a field named 'role', you can return it directly
            return user.getFirstName() + " " + user.getLastName() ; // Assuming 'role' is a String field in the UserEntity
        } else {
            // If user with the provided email doesn't exist, return null or handle it accordingly
            return null;
        }
    }


    private boolean isValidCredentials(String email, String password) {
        Optional<UserEntity> userOptional = userRepository.findByEmailIdAndPassword(email, password);
        return userOptional.isPresent();
    }
}

