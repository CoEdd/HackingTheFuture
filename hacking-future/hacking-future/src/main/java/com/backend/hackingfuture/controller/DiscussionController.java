package com.backend.hackingfuture.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.hackingfuture.entity.DiscussionEntity;
import com.backend.hackingfuture.service.DiscussionService;

@RestController
@RequestMapping("/api/v1")
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @PostMapping("/discussions")
    public ResponseEntity<DiscussionEntity> saveDiscussion(@RequestBody DiscussionEntity discussion) {
        return ResponseEntity.ok(discussionService.saveDiscussion(discussion));
    }

    @GetMapping("/discussions")
    public ResponseEntity<List<DiscussionEntity>> getAllDiscussions() {
        return ResponseEntity.ok(discussionService.getAllDiscussions());
    }

    @GetMapping("/discussions/{id}")
    public ResponseEntity<DiscussionEntity> getDiscussionById(@PathVariable Long id) {
        return ResponseEntity.ok(discussionService.getDiscussionById(id));
    }

    @PutMapping("/discussions/{id}")
    public ResponseEntity<DiscussionEntity> updateDiscussion(@PathVariable Long id, @RequestBody DiscussionEntity discussion) {
        return ResponseEntity.ok(discussionService.updateDiscussion(id, discussion));
    }

    @DeleteMapping("/discussions/{id}")
    public ResponseEntity<Void> deleteDiscussion(@PathVariable Long id) {
        discussionService.deleteDiscussion(id);
        return ResponseEntity.noContent().build();
    }
}
