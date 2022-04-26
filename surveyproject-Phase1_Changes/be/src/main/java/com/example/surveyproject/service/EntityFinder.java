package com.example.surveyproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.surveyproject.exception.GeneralException;
import com.example.surveyproject.model.User;
import com.example.surveyproject.repository.RepositoryAccess;

@Service
public class EntityFinder {

	@Autowired
	RepositoryAccess repositoryAccess;

	public User findUserByEmail(String email) throws GeneralException {
		User user = repositoryAccess.userRepository.findByEmail(email);
		if (user != null) {
			return user;
		} else {
			throw new GeneralException("user not found");
		}
	}

}
