package com.example.surveyproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.surveyproject.model.EndUserAnswer;
import com.example.surveyproject.model.Form;

@Repository
public interface EndUserAnswerRepository extends JpaRepository<EndUserAnswer, Long> {

	public List<EndUserAnswer> findByFormOrderByCreatedDateAsc(Form form);

	public Integer countByForm(Form form);

}
