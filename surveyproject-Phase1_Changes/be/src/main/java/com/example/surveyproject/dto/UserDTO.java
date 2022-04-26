package com.example.surveyproject.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

public class UserDTO extends BaseDTO {

	private String email;
	private String firstName;
	private String lastName;
	private String promoCode;
	@SuppressWarnings("unused")
	private String name;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	private String status;
	private String subId;
	private String subDate;
	private String subAmount;
	private String nextDate;
	private String cancelUrl;
	private String userBrandLogo;
	private String userBrandLogoType;
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return ((firstName) + ((lastName != null) ? (" " + lastName) : ""));
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSubId() {
		return subId;
	}

	public void setSubId(String subId) {
		this.subId = subId;
	}

	public String getSubDate() {
		return subDate;
	}

	public void setSubDate(String subDate) {
		this.subDate = subDate;
	}

	public String getSubAmount() {
		return subAmount;
	}

	public void setSubAmount(String subAmount) {
		this.subAmount = subAmount;
	}

	public String getNextDate() {
		return nextDate;
	}

	public void setNextDate(String nextDate) {
		this.nextDate = nextDate;
	}

	public String getCancelUrl() {
		return cancelUrl;
	}

	public void setCancelUrl(String cancelUrl) {
		this.cancelUrl = cancelUrl;
	}

	public String getPromoCode() {
		return promoCode;
	}

	public void setPromoCode(String promoCode) {
		this.promoCode = promoCode;
	}

	public String getUserBrandLogo() {
		return userBrandLogo;
	}

	public void setUserBrandLogo(String userBrandLogo) {
		this.userBrandLogo = userBrandLogo;
	}

	public String getUserBrandLogoType() {
		return userBrandLogoType;
	}

	public void setUserBrandLogoType(String userBrandLogoType) {
		this.userBrandLogoType = userBrandLogoType;
	}
}
