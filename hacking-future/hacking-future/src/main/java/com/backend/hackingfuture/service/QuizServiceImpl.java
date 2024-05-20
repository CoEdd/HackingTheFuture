package com.backend.hackingfuture.service;

import com.backend.hackingfuture.entity.QuizEntity;
import com.backend.hackingfuture.model.Quiz;
import com.backend.hackingfuture.repository.QuizRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;

    public QuizServiceImpl(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @Override
    public Quiz saveQuiz(Quiz quiz) {
        QuizEntity quizEntity = new QuizEntity();
        BeanUtils.copyProperties(quiz, quizEntity);
        quizRepository.save(quizEntity);
        return quiz;
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        List<QuizEntity> quizEntities = quizRepository.findAll();
        return quizEntities.stream()
                .map(quizEntity -> {
                    Quiz quiz = new Quiz();
                    BeanUtils.copyProperties(quizEntity, quiz);
                    return quiz;
                })
                .collect(Collectors.toList());
    }

    @Override
    public Quiz getQuizById(Long id) {
        QuizEntity quizEntity = quizRepository.findById(id).orElse(null);
        if (quizEntity == null) {
            return null;
        }
        Quiz quiz = new Quiz();
        BeanUtils.copyProperties(quizEntity, quiz);
        return quiz;
    }

    @Override
    public boolean deleteQuiz(Long id) {
        quizRepository.deleteById(id);
        return true;
    }

    @Override
    public Quiz updateQuiz(Long id, Quiz quiz) {
        QuizEntity quizEntity = quizRepository.findById(id).orElse(null);
        if (quizEntity == null) {
            return null;
        }
        BeanUtils.copyProperties(quiz, quizEntity);
        quizRepository.save(quizEntity);
        return quiz;
    }
}
