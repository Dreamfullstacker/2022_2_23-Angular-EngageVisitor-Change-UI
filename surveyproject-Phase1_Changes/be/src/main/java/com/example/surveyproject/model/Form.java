package com.example.surveyproject.model;

import java.sql.Timestamp;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@NamedQuery(name = "Form.findAll", query = "SELECT f FROM Form f")
public class Form {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@CreationTimestamp
	@Column(name = "created_date")
	private Timestamp createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@Column(name = "status")
	private String status;

	@Column(name = "visibility_status")
	private String visibilityStatus;

	@Column(name = "showWelcome")
	private int welcomePageVisibility;

	@Column(name = "showThankYou")
	private int thanksPageVisibility;

	@Column(name = "thankYouMessage")
	private String thankYouMessage ="Thank you for taking this survey.";

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "form_link")
	private String formLink;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "theme_id")
	private Theme theme;

	@Column(name = "isTemplate")
	private boolean isTemplate;

	@Column(name = "isPremium")
	private boolean isPremium;

	@Column(name = "redirecturl")
	private String redirectUrl;

	public String getThankYouMessage() {
		return thankYouMessage;
	}

	public void setThankYouMessage(String thankYouMessage) {
		this.thankYouMessage = thankYouMessage;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Timestamp getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getVisibilityStatus() {
		return visibilityStatus;
	}

	public void setVisibilityStatus(String visibilityStatus) {
		this.visibilityStatus = visibilityStatus;
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

	public boolean isTemplate() {
		return isTemplate;
	}

	public void setTemplate(boolean template) {
		isTemplate = template;
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
}
