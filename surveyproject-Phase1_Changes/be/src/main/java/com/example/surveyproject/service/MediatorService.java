package com.example.surveyproject.service;

import com.example.surveyproject.dto.FormDTO;
import com.example.surveyproject.dto.QuestionOptionDTO;
import com.example.surveyproject.model.Form;
import com.example.surveyproject.model.Question;
import com.example.surveyproject.model.QuestionOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediatorService {

	@Autowired
	public QuestionService questionService;

	public void addTemplateQuestions(Form form,FormDTO dto){
		if(dto.getQuestionDTOList() !=null && !dto.getQuestionDTOList().isEmpty()){
			dto.getQuestionDTOList().stream().peek(question->question.setFormId(form.getId())).forEach(questionService::addQuestion);
		}
	}

	public List<QuestionOptionDTO> getQuestionOptionDtoList(Question question){
		return questionService.getQuestionOptionDtoList(question);
	}

}
