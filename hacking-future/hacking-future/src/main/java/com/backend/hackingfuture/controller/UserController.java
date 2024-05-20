package com.backend.hackingfuture.controller;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.hackingfuture.entity.UserEntity;
import com.backend.hackingfuture.model.User;
import com.backend.hackingfuture.service.UserService;
 
@RestController
@RequestMapping("/api/v1")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = null;
        user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable("id") Long id) {
        boolean deleted = false;
        deleted =userService.deleteUser(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id,
                                           @RequestBody User user) {
        user = userService.updateUser(id,user);
        return ResponseEntity.ok(user);
    }
    
    // Update the endpoint to include '/email/' to avoid conflict
    @GetMapping("/users/email/{email}")
    public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) {
        Optional<UserEntity> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/users/ranked")
    public ResponseEntity<List<Map<String, Object>>> getRankedUsers() {
        List<User> allUsers = userService.getAllUsers(); // Assuming this returns List<User>
    
        // Filtering users to include only those with the role of "student"
        List<User> studentUsers = allUsers.stream()
            .filter(user -> "student".equalsIgnoreCase(user.getRole()))
            .collect(Collectors.toList());
    
        // Sorting users based on student points in descending order
        List<User> rankedUsers = studentUsers.stream()
            .sorted(Comparator.comparing(User::getStudentpoint).reversed())
            .collect(Collectors.toList());
    
        // Creating response containing required fields
        List<Map<String, Object>> rankedUserData = rankedUsers.stream()
            .map(user -> {
                Map<String, Object> userData = new HashMap<>();
                userData.put("id", rankedUsers.indexOf(user) + 1); // Rank based on position in the sorted list
                userData.put("username", user.getFirstName() + " " + user.getLastName());
                userData.put("email", user.getEmailId());
                userData.put("studentPoint", user.getStudentpoint());
                return userData;
            })
            .collect(Collectors.toList());
    
        return ResponseEntity.ok(rankedUserData);
    }

}
