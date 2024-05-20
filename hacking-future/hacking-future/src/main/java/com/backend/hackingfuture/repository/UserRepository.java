package com.backend.hackingfuture.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.hackingfuture.entity.UserEntity;
// import com.backend.hackingfuture.model.User;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmailIdAndPassword(String emailId, String password);

    Optional<UserEntity> findByEmailId(String emailId);

    // Optional<UserEntity> findByEmailId(String email);
}
