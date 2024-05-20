package com.backend.hackingfuture.model;

public class Quiz {

    private long id;

    private String quizTitle;
    private String quizDescription;
    private String quizTheme;
    private String quizContent;
    private String creatorEmail;

    // Constructors, getters, and setters
    // Constructors
    public Quiz() {
    }

    public Quiz(long id, String quizTitle, String quizDescription, String quizTheme, String quizContent, String creatorEmail) {
        this.id = id;
        this.quizTitle = quizTitle;
        this.quizDescription = quizDescription;
        this.quizTheme = quizTheme;
        this.quizContent = quizContent;
        this.creatorEmail = creatorEmail;
    }

    public String getQuizDescription() {
        return quizDescription;
    }

    public void setQuizDescription(String quizDescription) {
        this.quizDescription = quizDescription;
    }

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getQuizContent() {
        return quizContent;
    }

    public void setQuizContent(String quizContent) {
        this.quizContent = quizContent;
    }

    public String getCreatorEmail() {
        return creatorEmail;
    }

    public void setCreatorEmail(String creatorEmail) {
        this.creatorEmail = creatorEmail;
    }
}
