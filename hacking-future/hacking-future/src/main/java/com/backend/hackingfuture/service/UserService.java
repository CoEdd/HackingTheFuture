package com.backend.hackingfuture.service;

import java.util.Optional;

import com.backend.hackingfuture.entity.UserEntity;
import com.backend.hackingfuture.model.User;

public interface UserService {

    User saveUser(User user);

    java.util.List<User> getAllUsers();

    User getUserById(Long id);

    boolean deleteUser(Long id);

    User updateUser(Long id, User user);

    // User findByEmailAndPassword(String email, String password);

    // Add method to assign random coordinates
    void assignRandomCoordinatesToUser(Long id);

    Optional<UserEntity> getUserByEmail(String emailId);
    
}
