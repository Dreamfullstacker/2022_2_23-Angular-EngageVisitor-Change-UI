package com.example.surveyproject.util;

import java.util.HashMap;
import java.util.Map;

public class EmailModel {

	private String to;
	private String subject;
	private Map<String, String> model = new HashMap<>();

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public Map<String, String> getModel() {
		return model;
	}

	public void setModel(Map<String, String> model) {
		this.model = model;
	}

}
