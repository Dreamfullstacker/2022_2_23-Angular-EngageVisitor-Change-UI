package com.example.surveyproject.dto;

import java.util.ArrayList;
import java.util.List;

public class EndUserAnswerDTO extends BaseDTO {

	private Long userId;

	private Long formId;

	private String title;
	
	private List<QuestionDTO> questionDTOList = new ArrayList<>();

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getFormId() {
		return formId;
	}

	public void setFormId(Long formId) {
		this.formId = formId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<QuestionDTO> getQuestionDTOList() {
		return questionDTOList;
	}

	public void setQuestionDTOList(List<QuestionDTO> questionDTOList) {
		this.questionDTOList = questionDTOList;
	}
	
	

}
