package com.example.surveyproject.dto;

import java.util.ArrayList;
import java.util.List;

public class ResponseDTO {

	private String statusCode;
	private String message;
	private Object data;
	private List<?> dataList = new ArrayList<>();

	public ResponseDTO(String statusCode, String message, Object data, List<?> dataList) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.dataList = dataList != null ? dataList : this.dataList;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public List<?> getDataList() {
		return dataList;
	}

	public void setDataList(List<?> dataList) {
		this.dataList = dataList;
	}

}
