package com.example.surveyproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.surveyproject.model.Form;
import com.example.surveyproject.model.User;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {

	public Form findByIdAndStatus(Long id, String status);

	public List<Form> findByUserAndStatusOrderByCreatedDateDesc(User user, String status);

	public List<Form> findByUserOrderByCreatedDateDesc(User user);

	public List<Form> findByIsTemplateAndStatus(boolean isTemplate, String status);

	public List<Form> findByIsTemplateAndStatusAndVisibilityStatus(boolean isTemplate, String status,String visiblityStatus);

	public Form findByFormLinkAndStatusAndVisibilityStatus(String formLink, String status, String visibilityStatus);

	public Form findByFormLinkAndStatus(String formLink, String status);

}
