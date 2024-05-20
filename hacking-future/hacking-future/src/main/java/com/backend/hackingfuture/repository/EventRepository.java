package com.backend.hackingfuture.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.hackingfuture.entity.EventPageEntity;
import com.backend.hackingfuture.model.Event;

@Repository
public interface EventRepository extends JpaRepository<EventPageEntity, Long> {
    // You can define custom query methods here if needed
    List<Event> findByEventDate(String eventDate);
}