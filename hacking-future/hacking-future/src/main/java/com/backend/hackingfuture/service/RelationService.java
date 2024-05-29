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
    List<RelationEntity> getRelationsByChildemail(String childemail);
    boolean relationExists(String useremail, String friendemail);
    List<RelationEntity> getPendingRelationsByUseremail(String useremail);
    RelationEntity updateRelationStatus(long id, String status);
    List<RelationEntity> getPendingRelationsByFriendemail(String friendemail);
    boolean childEmailExists(String childemail);
    String getParentNameByChildEmail(String childemail);
    

}
