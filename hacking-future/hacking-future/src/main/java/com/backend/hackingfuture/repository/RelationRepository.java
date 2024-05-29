package com.backend.hackingfuture.repository;

import com.backend.hackingfuture.entity.RelationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationRepository extends JpaRepository<RelationEntity, Long> {
    List<RelationEntity> findByUseremail(String useremail);
    List<RelationEntity> findByFriendemail(String friendemail);
    List<RelationEntity> findByChildemail(String childemail);
    List<RelationEntity> findByUseremailAndFriendemail(String useremail, String friendemail);
    List<RelationEntity> findByUseremailAndStatus(String useremail, String status);
    boolean existsByUseremailAndFriendemail(String useremail, String friendemail);
    List<RelationEntity> findByFriendemailAndStatus(String friendemail, String status);

    
}
