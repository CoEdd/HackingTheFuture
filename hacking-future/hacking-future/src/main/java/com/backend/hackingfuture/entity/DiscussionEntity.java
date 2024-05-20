package com.backend.hackingfuture.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "discussions")
public class DiscussionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String discussionText;

    public DiscussionEntity() {
    }

    public DiscussionEntity(long id, String name, String discussionText) {
        this.id = id;
        this.name = name;
        this.discussionText = discussionText;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDiscussionText() {
        return discussionText;
    }

    public void setDiscussionText(String discussionText) {
        this.discussionText = discussionText;
    }
}
