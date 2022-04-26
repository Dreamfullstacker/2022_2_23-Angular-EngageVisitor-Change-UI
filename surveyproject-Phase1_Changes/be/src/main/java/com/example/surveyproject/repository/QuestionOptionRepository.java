package com.example.surveyproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.surveyproject.model.Question;
import com.example.surveyproject.model.QuestionOption;

@Repository
public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {

	public List<QuestionOption> findByQuestionOrderByCreatedDateAsc(Question question);

	@Modifying
	@Query(value = "delete from question_option qo where qo.question_id = ?1", nativeQuery = true)
	public void deleteByQuestionId(Long questionId);

}
