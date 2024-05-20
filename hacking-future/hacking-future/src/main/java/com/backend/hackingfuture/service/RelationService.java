package com.backend.hackingfuture.service;

import com.backend.hackingfuture.entity.RelationEntity;
import java.util.List;

public interface RelationService {
    RelationEntity saveRelation(RelationEntity relation);
    List<RelationEntity> getAllRelations();
    RelationEntity getRelationById(long id);
    RelationEntity updateRelation(long id, RelationEntity relation);
    void deleteRelation(long id);
    List<RelationEntity> getRelationsByUseremail(String useremail);
    List<RelationEntity> getRelationsByFriendemail(String friendemail);
    List<RelationEntity> getRelationsByParentemail(String parentemail);
    boolean relationExists(String useremail, String friendemail);
    List<RelationEntity> getPendingRelationsByUseremail(String useremail);
    RelationEntity updateRelationStatus(long id, String status);
    List<RelationEntity> getPendingRelationsByFriendemail(String friendemail);  // Added method
    // List<RelationEntity> getPendingRelationsByFriendemail(String friendemail);
}
