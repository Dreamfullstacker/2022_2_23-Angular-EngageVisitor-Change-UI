package com.example.surveyproject.dto;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class QuestionDTO extends BaseDTO {

	private long questId;

	private String question;

	private Integer sequence;

	private String description;

	private Long userId;

	private Long questionTypeId;

	private Long formId;

	private List<QuestionOptionDTO> questionOptionDTOList;

	private List<AnswerDTO> answerDTOList;

	private String background;

	private String backgroundType;

	private String answer;

	private int bgType =0;

	private Integer happyQuestion;

	private Integer unHappyQuestion;

	private boolean otherOpt;

	private boolean isHidden;
	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getQuestionTypeId() {
		return questionTypeId;
	}

	public void setQuestionTypeId(Long questionTypeId) {
		this.questionTypeId = questionTypeId;
	}

	public Long getFormId() {
		return formId;
	}

	public void setFormId(Long formId) {
		this.formId = formId;
	}

	public List<QuestionOptionDTO> getQuestionOptionDTOList() {
		return questionOptionDTOList != null ? questionOptionDTOList : new ArrayList<QuestionOptionDTO>();
	}

	public void setQuestionOptionDTOList(List<QuestionOptionDTO> questionOptionDTOList) {
		this.questionOptionDTOList = questionOptionDTOList;
	}

	public List<AnswerDTO> getAnswerDTOList() {
		return answerDTOList;
	}

	public void setAnswerDTOList(List<AnswerDTO> answerDTOList) {
		this.answerDTOList = answerDTOList;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Integer getSequence() {
		return sequence;
	}

	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}

	public boolean isHidden() {
		return isHidden;
	}

	public void setHidden(boolean hidden) {
		isHidden = hidden;
	}

	public long getQuestId() {
		return questId;
	}

	public void setQuestId(long questId) {
		this.questId = questId;
	}


	public String getBackground() {
		return background;
	}

	public void setBackground(String background) {
		this.background = background;
	}

	public String getBackgroundType() {
		return backgroundType;
	}

	public void setBackgroundType(String backgroundType) {
		this.backgroundType = backgroundType;
	}

	public int getBgType() {
		if(backgroundType !=null && backgroundType.toLowerCase().startsWith("image"))
			bgType= 1;
		else if(backgroundType !=null && backgroundType.toLowerCase().startsWith("video"))
			bgType= 2;
		return bgType;
	}

	public Integer getHappyQuestion() {
		return happyQuestion;
	}

	public void setHappyQuestion(Integer happyQuestion) {
		this.happyQuestion = happyQuestion;
	}

	public Integer getUnHappyQuestion() {
		return unHappyQuestion;
	}

	public void setUnHappyQuestion(Integer unHappyQuestion) {
		this.unHappyQuestion = unHappyQuestion;
	}

	public boolean isOtherOpt() {
		return otherOpt;
	}

	public void setOtherOpt(boolean otherOpt) {
		this.otherOpt = otherOpt;
	}


}