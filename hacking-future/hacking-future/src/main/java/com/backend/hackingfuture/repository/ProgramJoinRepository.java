package com.backend.hackingfuture.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.hackingfuture.entity.ProgramJoinEntity;

@Repository
public interface ProgramJoinRepository extends JpaRepository<ProgramJoinEntity, Long> {
    List<ProgramJoinEntity> findByEmailRegisterAndEventTitle(String emailRegister, String eventTitle);
    List<ProgramJoinEntity> findByEventDate(String eventDate); // Add this method
    
}
