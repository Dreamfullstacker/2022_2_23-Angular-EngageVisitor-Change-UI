package com.example.surveyproject.model;

import com.example.surveyproject.util.SecurityUtils;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "status")
	private String status;

	@CreationTimestamp
	@Column(name = "created_date")
	private Timestamp createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Timestamp updatedDate;

	@Column(name="licenceKey",nullable = false,columnDefinition = "varchar(512) default ''")
	private String userLicence ="";

	@Column(name="brandlogo",nullable = true,columnDefinition = "longtext")
	private String userBrandLogo;

	@Column(name="brandlogotype",nullable = true)
	private String userBrandLogoType;

	@Enumerated(EnumType.ORDINAL)
	private USERTYPE userType =USERTYPE.USER;

	@Transient
	boolean isPremium;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public USERTYPE getUserType() {
		return userType;
	}

	public void setUserType(USERTYPE userType) {
		this.userType = userType;
	}

	public String getUserLicence() {
		return userLicence;
	}

	public void setUserLicence(String userLicence) {
		this.userLicence = userLicence;
	}

	public boolean isPremium() {
		return SecurityUtils.verifyLicence(this);
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
