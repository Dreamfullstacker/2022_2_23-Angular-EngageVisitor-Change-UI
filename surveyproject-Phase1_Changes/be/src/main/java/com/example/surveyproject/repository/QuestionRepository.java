package com.example.surveyproject.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.surveyproject.model.Form;
import com.example.surveyproject.model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

	public List<Question> findByFormOrderBySequenceAsc(Form form);
	public List<Question> findByFormIdOrderBySequenceAsc(long id);
	List<Question> findByFormAndIsHiddenOrderBySequenceAsc(Form form,Boolean isHidden);
	Optional<Question> findTopByFormOrderBySequenceDesc(Form form);


}
