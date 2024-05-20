package com.backend.hackingfuture.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.hackingfuture.entity.DiscussionEntity;
import com.backend.hackingfuture.repository.DiscussionRepository;

@Service
public class DiscussionServiceImpl implements DiscussionService {

    private final DiscussionRepository discussionRepository;

    @Autowired
    public DiscussionServiceImpl(DiscussionRepository discussionRepository) {
        this.discussionRepository = discussionRepository;
    }

    @Override
    public DiscussionEntity saveDiscussion(DiscussionEntity discussion) {
        return discussionRepository.save(discussion);
    }

    @Override
    public List<DiscussionEntity> getAllDiscussions() {
        return discussionRepository.findAll();
    }

    @Override
    public DiscussionEntity getDiscussionById(Long id) {
        return discussionRepository.findById(id).orElseThrow(() -> new RuntimeException("Discussion not found"));
    }

    @Override
    public DiscussionEntity updateDiscussion(Long id, DiscussionEntity discussion) {
        DiscussionEntity existingDiscussion = discussionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));
        existingDiscussion.setName(discussion.getName());
        existingDiscussion.setDiscussionText(discussion.getDiscussionText());
        return discussionRepository.save(existingDiscussion);
    }

    @Override
    public boolean deleteDiscussion(Long id) {
        DiscussionEntity existingDiscussion = discussionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Discussion not found"));
        discussionRepository.delete(existingDiscussion);
        return true;
    }
}
