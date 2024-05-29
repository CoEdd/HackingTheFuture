package com.backend.hackingfuture.model;

public class Relation {
    private long id;
    private String useremail;
    private String friendemail;
    private String childemail;
    private String status;

    public Relation(long id, String useremail, String friendemail, String childemail, String status) {
        this.id = id;
        this.useremail = useremail;
        this.friendemail = friendemail;
        this.childemail= childemail;
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

    public String getChildemail() {
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
