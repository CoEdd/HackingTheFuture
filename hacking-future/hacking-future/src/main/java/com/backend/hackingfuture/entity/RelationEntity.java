package com.backend.hackingfuture.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "relations")
public class RelationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String useremail;
    private String friendemail;
    private String parentemail;
    private String status;

    public RelationEntity() {
    }

    public RelationEntity(String useremail, String friendemail, String parentemail, String status) {
        this.useremail = useremail;
        this.friendemail = friendemail;
        this.parentemail = parentemail;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUseremail() {
        return useremail;
    }

    public void setUseremail(String useremail) {
        this.useremail = useremail;
    }

    public String getFriendemail() {
        return friendemail;
    }

    public void setFriendemail(String friendemail) {
        this.friendemail = friendemail;
    }

    public String getParentmail() {
        return parentemail;
    }

    public void setParentemail(String parentemail) {
        this.parentemail = parentemail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}
