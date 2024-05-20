package com.backend.hackingfuture.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.hackingfuture.model.Quiz;
import com.backend.hackingfuture.service.QuizService;

@RestController
@RequestMapping("/api/v1")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/quizzes")
    public Quiz saveQuiz(@RequestBody Quiz quiz) {
        return quizService.saveQuiz(quiz);
    }

    @GetMapping("/quizzes")
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable("id") Long id) {
        Quiz quiz = quizService.getQuizById(id);
        return ResponseEntity.ok(quiz);
    }

    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteQuiz(@PathVariable("id") Long id) {
        boolean deleted = quizService.deleteQuiz(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable("id") Long id,
                                            @RequestBody Quiz quiz) {
        quiz = quizService.updateQuiz(id, quiz);
        return ResponseEntity.ok(quiz);
    }
}
