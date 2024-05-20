package com.backend.hackingfuture.service;

import java.util.List;
import com.backend.hackingfuture.entity.DiscussionEntity;

public interface DiscussionService {
    DiscussionEntity saveDiscussion(DiscussionEntity discussion);

    List<DiscussionEntity> getAllDiscussions();

    DiscussionEntity getDiscussionById(Long id);

    DiscussionEntity updateDiscussion(Long id, DiscussionEntity discussion);

    boolean deleteDiscussion(Long id);
}
