package com.backend.hackingfuture.entity;

// import javax.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private String password;
    private String role; // New column for role
    private String studentcoordinate;
    private int studentpoint;



    public UserEntity() {
    }


    public UserEntity(long id, String firstName, String lastName, String emailId, String password, String role, String studentcoordinate, int studentpoint) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.password = password;
        this.role = role;
        this.studentcoordinate = studentcoordinate;
        this.studentpoint = 0;
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