package com.backend.hackingfuture.model;

public class Event {

    private long id;

    private String eventTitle;
    private String eventDescription;
    private String eventVenue;
    private String eventDate;
    private String eventTime;
    private String creatorEmail;

    // Constructors, getters, and setters
    // Constructors
    public Event() {
    }

    public Event(long id, String eventTitle, String eventDescription, String eventVenue, String eventDate, String eventTime, String creatorEmail) {
        this.id = id;
        this.eventTitle = eventTitle;
        this.eventDescription = eventDescription;
        this.eventVenue = eventVenue;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.creatorEmail = creatorEmail;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getEventVenue() {
        return eventVenue;
    }

    public void setEventVenue(String eventVenue) {
        this.eventVenue = eventVenue;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventTime() {
        return eventTime;
    }

    public void setEventTime(String eventTime) {
        this.eventTime = eventTime;
    }

    public String getCreatorEmail() {
        return creatorEmail;
    }

    public void setCreatorEmail(String creatorEmail) {
        this.creatorEmail = creatorEmail;
    }
}
