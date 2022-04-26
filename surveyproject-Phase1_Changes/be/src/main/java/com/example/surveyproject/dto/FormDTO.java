package com.example.surveyproject.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.surveyproject.model.Theme;
import com.example.surveyproject.util.Constant;

public class FormDTO extends BaseDTO {

	private String status;

	private String visibilityStatus;

	private int welcomePageVisibility ;
	private int thanksPageVisibility;

	@SuppressWarnings("unused")
	private String visibilityStatusSTR;

	private String title;

	private String description;

	private String formLink;

	private String thankYouMessage;

	private List<QuestionDTO> questionDTOList;

	private List<AnswerDTO> hiddenAnswerDto;

	private Long userId;

	private Integer totalResponse;

	private Theme theme;

	private boolean isPremium;

	private String redirectUrl;
	private String bgType;
	private String bgData;
	public Integer getTotalResponse() {
		return totalResponse != null ? totalResponse : 0;
	}

	public void setTotalResponse(Integer totalResponse) {
		this.totalResponse = totalResponse;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFormLink() {
		return formLink;
	}

	public void setFormLink(String formLink) {
		this.formLink = formLink;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getVisibilityStatus() {
		return visibilityStatus;
	}

	public void setVisibilityStatus(String visibilityStatus) {
		this.visibilityStatus = visibilityStatus;
	}

	public String getVisibilityStatusSTR() {
		switch (this.visibilityStatus) {
		case Constant.FORM_VISIBILITY_STATUS_UNPUBLISHED:
			return Constant.FORM_VISIBILITY_STATUS_UNPUBLISHED_STR;
		case Constant.FORM_VISIBILITY_STATUS_PUBLISHED:
			return Constant.FORM_VISIBILITY_STATUS_PUBLISHED_STR;
		}
		return null;
	}

	public void setVisibilityStatusSTR(String visibilityStatusSTR) {
		this.visibilityStatusSTR = visibilityStatusSTR;
	}

	public int getWelcomePageVisibility() {
		return welcomePageVisibility;
	}

	public void setWelcomePageVisibility(int welcomePageVisibility) {
		this.welcomePageVisibility = welcomePageVisibility;
	}

	public int getThanksPageVisibility() {
		return thanksPageVisibility;
	}

	public void setThanksPageVisibility(int thanksPageVisibility) {
		this.thanksPageVisibility = thanksPageVisibility;
	}

	public List<QuestionDTO> getQuestionDTOList() {
		return questionDTOList != null ? questionDTOList : new ArrayList<QuestionDTO>();
	}

	public void setQuestionDTOList(List<QuestionDTO> questionDTOList) {
		this.questionDTOList = questionDTOList;
	}

	public List<AnswerDTO> getHiddenAnswerDto() {
		return hiddenAnswerDto;
	}

	public void setHiddenAnswerDto(List<AnswerDTO> hiddenAnswerDto) {
		this.hiddenAnswerDto = hiddenAnswerDto;
	}

	public String getThankYouMessage() {
		return thankYouMessage;
	}

	public void setThankYouMessage(String thankYouMessage) {
		this.thankYouMessage = thankYouMessage;
	}

	public Theme getTheme() {
		return theme;
	}

	public void setTheme(Theme theme) {
		this.theme = theme;
	}

	public boolean isPremium() {
		return isPremium;
	}

	public void setPremium(boolean premium) {
		isPremium = premium;
	}

	public String getRedirectUrl() {
		return redirectUrl;
	}

	public void setRedirectUrl(String redirectUrl) {
		this.redirectUrl = redirectUrl;
	}

	public String getBgType() {
		return bgType;
	}

	public void setBgType(String bgType) {
		this.bgType = bgType;
	}

	public String getBgData() {
		return bgData;
	}

	public void setBgData(String bgData) {
		this.bgData = bgData;
	}
}
