package com.example.surveyproject.dto;

public class AnswerDTO extends BaseDTO {

	private String answer;

	private Long userId;

	private Long questionId;

	private QuestionDTO questionDTO;

	private Long FormId;

	private Long endUserAnswerId;

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}

	public Long getFormId() {
		return FormId;
	}

	public void setFormId(Long formId) {
		FormId = formId;
	}

	public Long getEndUserAnswerId() {
		return endUserAnswerId;
	}

	public void setEndUserAnswerId(Long endUserAnswerId) {
		this.endUserAnswerId = endUserAnswerId;
	}

	public QuestionDTO getQuestionDTO() {
		return questionDTO;
	}

	public void setQuestionDTO(QuestionDTO questionDTO) {
		this.questionDTO = questionDTO;
	}

}
