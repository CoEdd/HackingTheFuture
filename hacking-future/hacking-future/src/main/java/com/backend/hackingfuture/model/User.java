package com.backend.hackingfuture.model;

public class User {
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private String password;
    private String role; // New field for role
    private String studentcoordinate;
    private int studentpoint;

    public User(long id, String firstName, String lastName, String emailId, String password, String role,  String studentcoordinate, int invalid) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.password = password;
        this.role = role;
        this.studentcoordinate = studentcoordinate;
        this.studentpoint = invalid;
    }

    public User() {

    }

    public String getStudentcoordinate() {
        return studentcoordinate;
    }


    public void setStudentcoordinate(String studentcoordinate) {
        this.studentcoordinate = studentcoordinate;
    }
  
    public int getStudentpoint() {
        return studentpoint;
    }

    public void setStudentpoint(int studentpoint) {
        this.studentpoint = studentpoint;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }



}