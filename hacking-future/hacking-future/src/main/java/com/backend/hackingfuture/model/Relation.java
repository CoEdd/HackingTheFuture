package com.backend.hackingfuture.model;

public class Relation {
    private long id;
    private String useremail;
    private String friendemail;
    private String parentemail;
    private String status;

    public Relation(long id, String useremail, String friendemail, String parentemail, String status) {
        this.id = id;
        this.useremail = useremail;
        this.friendemail = friendemail;
        this.parentemail= parentemail;
        this.status = status;
    }

    public Relation() {
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
        this.useremail= useremail;
    }

    public String getFriendemail() {
        return friendemail;
    }

    public void setFriendemail(String friendemail) {
        this.friendemail = friendemail;
    }

    public String getParentemail() {
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
