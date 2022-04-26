package com.example.surveyproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.surveyproject.model.Answer;
import com.example.surveyproject.model.EndUserAnswer;
import com.example.surveyproject.model.Question;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

	public Answer findByQuestion(Question question);

	public List<Answer> findByEndUserAnswer(EndUserAnswer endUserAnswer);

	public List<Answer> findByEndUserAnswerAndQuestion(EndUserAnswer endUserAnswer, Question question);

}
