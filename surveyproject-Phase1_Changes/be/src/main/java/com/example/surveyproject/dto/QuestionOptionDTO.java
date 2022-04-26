package com.example.surveyproject.dto;

public class QuestionOptionDTO extends BaseDTO {


	private String questionOption;

	private Long userId;

	private Long questionId;

	private Long FormId;

	private boolean isOther;

	private long nextQuestionId;
	private QuestionDTO nextQuestion;

	public String getQuestionOption() {
		return questionOption;
	}

	public void setQuestionOption(String questionOption) {
		this.questionOption = questionOption;
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

	public QuestionDTO getNextQuestion() {
		return nextQuestion;
	}

	public void setNextQuestion(QuestionDTO nextQuestion) {
		this.nextQuestion = nextQuestion;
	}

	public long getNextQuestionId() {
		return nextQuestionId;
	}

	public void setNextQuestionId(long nextQuestionId) {
		this.nextQuestionId = nextQuestionId;
	}

	public boolean isOther() {
		return isOther;
	}

	public void setOther(boolean other) {
		isOther = other;
	}
}
