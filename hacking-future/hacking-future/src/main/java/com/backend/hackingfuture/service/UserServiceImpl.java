package com.backend.hackingfuture.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.backend.hackingfuture.entity.UserEntity;
import com.backend.hackingfuture.model.User;
import com.backend.hackingfuture.repository.UserRepository;
import com.backend.hackingfuture.utils.CoordinateUtils;

@Service
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);

        // Assign random coordinates if not already set
        if (userEntity.getStudentcoordinate() == null) {
            String randomCoordinate = CoordinateUtils.generateRandomCoordinate();
            userEntity.setStudentcoordinate(randomCoordinate);
        }
        
        userRepository.save(userEntity);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<UserEntity> userEntities
                = userRepository.findAll();

        List<User> users = userEntities
                .stream()
                .map(userEntity -> new User(
                        userEntity.getId(),
                        userEntity.getFirstName(),
                        userEntity.getLastName(),
                        userEntity.getEmailId(),
                        userEntity.getPassword(),
                        userEntity.getRole(),
                        userEntity.getStudentcoordinate(),
                        userEntity.getStudentpoint()
                ))
                .collect(Collectors.toList());

        return users;
    }

    @Override
    public User getUserById(Long id) {
        UserEntity userEntity
                = userRepository.findById(id).get();
        User user = new User(id, null, null, null, null, null, null, 0);
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }

    @Override
    public boolean deleteUser(Long id) {
        UserEntity user =  userRepository.findById(id).get();
        userRepository.delete(user);
        return true;
    }

    @Override
    public User updateUser(Long id, User user) {
        UserEntity userEntity =
                userRepository.findById(id).get();
        userEntity.setEmailId(user.getEmailId());
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setPassword(user.getPassword());
        userEntity.setRole(user.getRole()); // Set role from user object

        userRepository.save(userEntity);
        return user;
    }

    @Override
    public void assignRandomCoordinatesToUser(Long id) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        String randomCoordinate = CoordinateUtils.generateRandomCoordinate();
        userEntity.setStudentcoordinate(randomCoordinate);
        userRepository.save(userEntity);
    }

    public Optional<UserEntity> getUserByEmail(String emailId) {
        return userRepository.findByEmailId(emailId);
    }

    @Override
    public void saveUserPoints(UserEntity user) {
        userRepository.save(user);
    }


}
