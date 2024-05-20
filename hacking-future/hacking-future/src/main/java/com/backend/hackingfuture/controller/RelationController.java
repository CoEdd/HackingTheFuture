package com.backend.hackingfuture.controller;

import com.backend.hackingfuture.entity.RelationEntity;
import com.backend.hackingfuture.service.RelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/relations")
public class RelationController {

    @Autowired
    private RelationService relationService;

    @PostMapping
    public ResponseEntity<RelationEntity> createRelation(@RequestBody RelationEntity relation) {
        RelationEntity savedRelation = relationService.saveRelation(relation);
        return ResponseEntity.ok(savedRelation);
    }

    @GetMapping
    public List<RelationEntity> getAllRelations() {
        return relationService.getAllRelations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RelationEntity> getRelationById(@PathVariable long id) {
        RelationEntity relation = relationService.getRelationById(id);
        if (relation != null) {
            return ResponseEntity.ok(relation);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<RelationEntity> updateRelation(@PathVariable long id, @RequestBody RelationEntity relation) {
        RelationEntity updatedRelation = relationService.updateRelation(id, relation);
        if (updatedRelation != null) {
            return ResponseEntity.ok(updatedRelation);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelation(@PathVariable long id) {
        relationService.deleteRelation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{useremail}")
    public List<RelationEntity> getRelationsByUseremail(@PathVariable String useremail) {
        return relationService.getRelationsByUseremail(useremail);
    }

    @GetMapping("/friend/{friendemail}")
    public List<RelationEntity> getRelationsByFriendemail(@PathVariable String friendemail) {
        return relationService.getRelationsByFriendemail(friendemail);
    }

    @GetMapping("/parent/{parentemail}")
    public List<RelationEntity> getRelationsByParentemail(@PathVariable String parentemail) {
        return relationService.getRelationsByParentemail(parentemail);
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkRelationExists(
            @RequestParam String useremail,
            @RequestParam String friendemail) {
        boolean exists = relationService.relationExists(useremail, friendemail);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/pending/{friendemail}")
    public List<RelationEntity> getPendingRelationsByFriendemail(@PathVariable String friendemail) {
        return relationService.getPendingRelationsByFriendemail(friendemail);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<RelationEntity> updateRelationStatus(@PathVariable long id, @RequestBody String status) {
        RelationEntity updatedRelation = relationService.updateRelationStatus(id, status);
        if (updatedRelation != null) {
            return ResponseEntity.ok(updatedRelation);
        }
        return ResponseEntity.notFound().build();
    }
}
