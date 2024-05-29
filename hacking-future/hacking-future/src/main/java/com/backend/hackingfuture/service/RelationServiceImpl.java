package com.backend.hackingfuture.service;

import com.backend.hackingfuture.entity.RelationEntity;
import com.backend.hackingfuture.repository.RelationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RelationServiceImpl implements RelationService {

    @Autowired
    private RelationRepository relationRepository;

    @Override
    public RelationEntity saveRelation(RelationEntity relation) {
        return relationRepository.save(relation);
    }

    @Override
    public List<RelationEntity> getAllRelations() {
        return relationRepository.findAll();
    }

    @Override
    public RelationEntity getRelationById(long id) {
        Optional<RelationEntity> relation = relationRepository.findById(id);
        return relation.orElse(null);
    }

    @Override
    public RelationEntity updateRelation(long id, RelationEntity relation) {
        Optional<RelationEntity> existingRelationOptional = relationRepository.findById(id);
        if (existingRelationOptional.isPresent()) {
            RelationEntity existingRelation = existingRelationOptional.get();
            existingRelation.setUseremail(relation.getUseremail());
            existingRelation.setFriendemail(relation.getFriendemail());
            existingRelation.setStatus(relation.getStatus());
            return relationRepository.save(existingRelation);
        }
        return null;
    }

    @Override
    public void deleteRelation(long id) {
        relationRepository.deleteById(id);
    }

    @Override
    public List<RelationEntity> getRelationsByUseremail(String useremail) {
        return relationRepository.findByUseremail(useremail);
    }

    @Override
    public List<RelationEntity> getRelationsByFriendemail(String friendemail) {
        return relationRepository.findByFriendemail(friendemail);
    }

    @Override
    public List<RelationEntity> getRelationsByChildemail(String childemail) {
        return relationRepository.findByChildemail(childemail);
    }

    @Override
    public boolean relationExists(String useremail, String friendemail) {
        return relationRepository.existsByUseremailAndFriendemail(useremail, friendemail);
    }

    @Override
    public List<RelationEntity> getPendingRelationsByUseremail(String useremail) {
        return relationRepository.findByUseremailAndStatus(useremail, "pending");
    }

    @Override
    public RelationEntity updateRelationStatus(long id, String status) {
        Optional<RelationEntity> optionalRelation = relationRepository.findById(id);
        if (optionalRelation.isPresent()) {
            RelationEntity relation = optionalRelation.get();
            relation.setStatus(status);
            return relationRepository.save(relation);
        }
        return null;
    }

    @Override
    public List<RelationEntity> getPendingRelationsByFriendemail(String friendemail) {
        return relationRepository.findByFriendemailAndStatus(friendemail, "pending");
    }

    @Override
    public boolean childEmailExists(String childemail) {
        List<RelationEntity> relations = relationRepository.findByChildemail(childemail);
        return !relations.isEmpty();
    }

    @Override
    public String getParentNameByChildEmail(String childemail) {
        List<RelationEntity> relations = relationRepository.findByChildemail(childemail);
        if (!relations.isEmpty()) {
            return relations.get(0).getUseremail(); // Assuming the first relation is the parent
        }
        return null;
    }

    
    
}
