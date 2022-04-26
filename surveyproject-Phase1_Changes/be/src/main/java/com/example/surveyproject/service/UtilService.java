package com.example.surveyproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.surveyproject.dto.QuestionTypeDTO;
import com.example.surveyproject.model.QuestionType;
import com.example.surveyproject.repository.RepositoryAccess;

@Service
public class UtilService {

	@Autowired
	RepositoryAccess repositoryAccess;
	@Autowired
	ServiceAccess serviceAccess;

	public List<QuestionTypeDTO> getQuestionType() {
		List<QuestionTypeDTO> questionTypeDTOList = new ArrayList<>();
		List<QuestionType> questionTypeList = repositoryAccess.questionTypeRepository.findAll();
		serviceAccess.mapperService.mapQuestionTypeDTOasList(questionTypeList, questionTypeDTOList);
		return questionTypeDTOList;
	}

	public boolean isPremiumUser(long userId){
		return repositoryAccess.userRepository.getOne(userId).isPremium();
	}
}