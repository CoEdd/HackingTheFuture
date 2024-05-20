package com.backend.hackingfuture.service;

import com.backend.hackingfuture.model.Quiz;
import java.util.List;

public interface QuizService {

    Quiz saveQuiz(Quiz quiz);

    List<Quiz> getAllQuizzes();

    Quiz getQuizById(Long id);

    boolean deleteQuiz(Long id);

    Quiz updateQuiz(Long id, Quiz quiz);
}
