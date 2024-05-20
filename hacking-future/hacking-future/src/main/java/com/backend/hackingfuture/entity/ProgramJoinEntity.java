package com.backend.hackingfuture.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "program_join")
public class ProgramJoinEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String emailRegister;
    private String eventTitle;
    private String eventDate;
    private String eventVenue;
    private String eventDescription;
    private String eventTime;
    private String quizTitle;
    private String quizTheme;
    private String quizDescription;
    private String quizContent;

    private String bookedByParent;

        public ProgramJoinEntity() {
    }


    
    public String getEmailRegister() {
        return emailRegister;
    }

    public void setEmailRegister(String emailRegister) {
        this.emailRegister = emailRegister;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }


    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }


    public String getEventVenue() {
        return eventVenue;
    }

    public void setEventVenue(String eventVenue) {
        this.eventVenue = eventVenue;
    }


    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }


    public String getEventTime() {
        return eventTime;
    }

    public void setEventTime(String eventTime) {
        this.eventTime = eventTime;
    }


    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }


    public String getQuizTheme() {
        return quizTheme;
    }

    public void setQuizTheme(String quizTheme) {
        this.quizTheme = quizTheme;
    }


    public String getQuizDescription() {
        return quizDescription;
    }

    public void setQuizDescription(String quizDescription) {
        this.quizDescription = quizDescription;
    }


    public String getQuizContent() {
        return quizContent;
    }

    public void setQuizContent(String quizContent) {
        this.quizContent = quizContent;
    }


    public String getBookedByParent() {
        return bookedByParent;
    }

    public void setBookedByParent(String bookedByParent) {
        this.bookedByParent = bookedByParent;
    }


    // Getters and Setters
    // ... (Add getters and setters for each field)
}
