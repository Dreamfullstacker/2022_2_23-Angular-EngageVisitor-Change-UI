package com.example.surveyproject.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.surveyproject.dto.MessageDTO;
import com.example.surveyproject.dto.UserDTO;
import com.example.surveyproject.exception.GeneralException;
import com.example.surveyproject.service.ServiceAccess;

@RestController
@RequestMapping("auth")
public class AuthController {

	@Autowired
	ServiceAccess serviceAccess;

	@CrossOrigin("*")
	@PostMapping(path = "/login")
	public UserDTO login() throws GeneralException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserDTO userDTO = serviceAccess.userService.findUserByEmail(auth.getName());
		return userDTO;
	}

	@CrossOrigin("*")
	@PostMapping(path = "/logout")
	public MessageDTO logout(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return new MessageDTO("Logout Successful");
	}

}
