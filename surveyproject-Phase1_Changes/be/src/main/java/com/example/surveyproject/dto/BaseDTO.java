package com.example.surveyproject.dto;

import java.sql.Timestamp;

import com.example.surveyproject.util.Util;

public class BaseDTO {

	Long id;
	String statusCode;
	Timestamp createdDate;
	Timestamp updatedDate;
	String createdDateStr;
	String updatedDateStr;

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

	public String getCreatedDateStr() {
		return this.createdDate != null ? Util.dateFormat.format(this.createdDate) : null;
	}

	public void setCreatedDateStr(String createdDateStr) {
		this.createdDateStr = createdDateStr;
	}

	public String getUpdatedDateStr() {
		return this.updatedDate != null ? Util.dateFormat.format(this.updatedDate) : null;
	}

	public void setUpdatedDateStr(String updatedDateStr) {
		this.updatedDateStr = updatedDateStr;
	}

}
