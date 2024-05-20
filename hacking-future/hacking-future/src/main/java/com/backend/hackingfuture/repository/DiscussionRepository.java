package com.backend.hackingfuture.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.hackingfuture.entity.DiscussionEntity;

@Repository
public interface DiscussionRepository extends JpaRepository<DiscussionEntity, Long> {
}
