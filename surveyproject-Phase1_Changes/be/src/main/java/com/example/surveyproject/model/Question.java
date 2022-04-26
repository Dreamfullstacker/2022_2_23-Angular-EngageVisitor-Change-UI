package com.example.surveyproject.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import javax.persistence.*;
import java.sql.Blob;
import java.sql.Timestamp;

@Entity
@NamedQuery(name = "Question.findAll", query = "SELECT q FROM Question q")
public class Question {

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

	@Column(name = "sequence")
	private Integer sequence;

	@Column(name = "question")
	private String question;

	@Column(name = "description")
	private String description;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "question_type")
	private QuestionType questionType;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "form_id")
	private Form form;

	@Column(name = "isHidden", columnDefinition ="tinyint default false")
	private boolean isHidden;

	@Column(name = "background")
	@Lob
	private String backgroundData;

	@Column(name="bgtype")
	private String bgType;

	@Column(name="showOtherOption")
	private boolean showOtherOption =false;

	@Column(name = "happyQuestion", columnDefinition ="int default 0")
	private Integer happyQuestion =0;

	@Column(name = "unHappyQuestion", columnDefinition ="int default 0")
	private Integer unHappyQuestion = 0;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public QuestionType getQuestionType() {
		return questionType;
	}

	public void setQuestionType(QuestionType questionType) {
		this.questionType = questionType;
	}

	public Form getForm() {
		return form;
	}

	public void setForm(Form form) {
		this.form = form;
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

	public Timestamp getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
	}

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

	public Integer getSequence() {
		return sequence;
	}

	public void setSequence(Integer sequence) {
		if(sequence!=null)
			this.sequence = sequence;
	}

	public boolean isHidden() {
		return isHidden;
	}

	public void setHidden(boolean isHidden) {
		this.isHidden = isHidden;
	}


	public String getBgType() {
		return bgType;
	}

	public void setBgType(String bgType) {
		this.bgType = bgType;
	}

	public  String getBackgroundData() {
		return backgroundData;
	}

	public void setBackgroundData(String backgroundData) {
		this.backgroundData = backgroundData;
	}

	public boolean isShowOtherOption() {
		return showOtherOption;
	}

	public void setShowOtherOption(boolean showOtherOption) {
		this.showOtherOption = showOtherOption;
	}

	public Integer getHappyQuestion() {
		return happyQuestion;
	}

	public void setHappyQuestion(Integer happyQuestion) {
		if(happyQuestion != null)
			this.happyQuestion = happyQuestion;
	}

	public Integer getUnHappyQuestion() {
		return unHappyQuestion;
	}

	public void setUnHappyQuestion(Integer unHappyQuestion) {
		if(unHappyQuestion != null)
			this.unHappyQuestion = unHappyQuestion;
	}
}
