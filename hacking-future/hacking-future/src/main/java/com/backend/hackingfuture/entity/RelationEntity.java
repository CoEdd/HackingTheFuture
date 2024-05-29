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
    private String childemail;
    private String status;

    public RelationEntity() {
    }

    public RelationEntity(String useremail, String friendemail, String childemail, String status) {
        this.useremail = useremail;
        this.friendemail = friendemail;
        this.childemail = childemail;
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

    public String getChildmail() {
        return childemail;
    }

    public void setChildemail(String childemail) {
        this.childemail = childemail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}
