package com.example.surveyproject.service;

import com.example.surveyproject.dto.AnswerDTO;
import com.example.surveyproject.dto.EndUserAnswerDTO;
import com.example.surveyproject.dto.QuestionDTO;
import com.example.surveyproject.exception.MemberShipException;
import com.example.surveyproject.model.Answer;
import com.example.surveyproject.model.EndUserAnswer;
import com.example.surveyproject.model.Form;
import com.example.surveyproject.model.Question;
import com.example.surveyproject.model.User;
import com.example.surveyproject.repository.RepositoryAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnswerService {

	@Autowired
	RepositoryAccess repositoryAccess;
	@Autowired
	ServiceAccess serviceAccess;

	public int getEndUserAnswerByFormId(Long formId,List<EndUserAnswerDTO> answerDTOS) {
		List<EndUserAnswer> endUserAnswerList = repositoryAccess.endUserAnswerRepository
				.findByFormOrderByCreatedDateAsc(repositoryAccess.formRepository.getOne(formId));
		int totalSize  = 0;
		if(endUserAnswerList ==null || endUserAnswerList.isEmpty()) {
			return totalSize;
		}
		boolean isPremiumUser = endUserAnswerList.get(0).getUser().isPremium();
		if(!isPremiumUser && endUserAnswerList.size()>100) {
			totalSize=endUserAnswerList.size();
			endUserAnswerList = endUserAnswerList.subList(0, 100);
		}
		serviceAccess.mapperService.mapEndUserAnswerDTOasList(endUserAnswerList, answerDTOS);
		if(!isPremiumUser && totalSize >100)
			return  totalSize *-1;
		return totalSize;
	}

	public List<QuestionDTO> getAnswerByEndUserId(Long endUserId, Long formId) {

		List<Question> questionList = null;
		List<QuestionDTO> questionDTOList = new ArrayList<>();
		questionList = repositoryAccess.questionRepository
				.findByFormOrderBySequenceAsc(repositoryAccess.formRepository.getOne(formId));
		if (questionList != null && !questionList.isEmpty()) {
			for (Question question : questionList) {
				List<Answer> answerList = repositoryAccess.answerRepository.findByEndUserAnswerAndQuestion(
						repositoryAccess.endUserAnswerRepository.getOne(endUserId), question);


				QuestionDTO questionDTO = new QuestionDTO();
				serviceAccess.mapperService.mapQuestionDTO(question, questionDTO);
				if(answerList.size()>1) {
					questionDTO.setAnswer(answerList.stream().map(Answer::getAnswer).collect(Collectors.joining(", "))
					);
				}else if(!answerList.isEmpty()){
					questionDTO.setAnswer(answerList.get(0).getAnswer());
				}
				questionDTO.setAnswerDTOList(serviceAccess.mapperService.mapAnswerDTODTOasList(answerList,new ArrayList<AnswerDTO>()));
				questionDTOList.add(questionDTO);
			}
		}
		return questionDTOList;
	}



	public boolean getAllAnswerDetailByFormId(Long formId, List<EndUserAnswerDTO> endUserAnswerDTOList) {

		Form form =repositoryAccess.formRepository.getOne(formId);
		if(!form.getUser().getEmail().equalsIgnoreCase(((org.springframework.security.core.userdetails.User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()) )
			throw new IllegalArgumentException("Access Denied");
			//SecurityContextHolder.getContext().getAuthentication()
		List<EndUserAnswer> endUserAnswerList = repositoryAccess.endUserAnswerRepository
				.findByFormOrderByCreatedDateAsc(repositoryAccess.formRepository.getOne(formId));

		if(endUserAnswerList ==null || endUserAnswerList.isEmpty())
			return true;
		boolean isRestricted =false;
		boolean isPremiumUser = endUserAnswerList.get(0).getUser().isPremium();
		if(!isPremiumUser  && endUserAnswerList.size()>100){
			isRestricted =true;
			endUserAnswerList = endUserAnswerList.subList(0,100);
		}

		serviceAccess.mapperService.mapEndUserAnswerDTOasList(endUserAnswerList, endUserAnswerDTOList);
		for (EndUserAnswerDTO endUserAnswerDTO : endUserAnswerDTOList) {
			endUserAnswerDTO.setQuestionDTOList(this.getAnswerByEndUserId(endUserAnswerDTO.getId(), formId));
		}
		if(!isPremiumUser && isRestricted)
			throw new MemberShipException("Please Upgrade to Premium membership to download all responses");

		return true;
	}

	public List<AnswerDTO> addAnswer(List<AnswerDTO> answerDTOList) {
		List<Answer> answerList = new ArrayList<>();
		EndUserAnswer endUserAnswer = new EndUserAnswer();
		User user = repositoryAccess.formRepository.getOne(answerDTOList.get(0).getFormId()).getUser();
		endUserAnswer.setForm(repositoryAccess.formRepository.getOne(answerDTOList.get(0).getFormId()));
		endUserAnswer.setUser(user);
		endUserAnswer.setTitle(answerDTOList.get(0).getAnswer());
		repositoryAccess.endUserAnswerRepository.save(endUserAnswer);

		for (AnswerDTO answerDTO : answerDTOList) {
			Answer answer = new Answer();
			answer.setUser(user);
			answer.setForm(repositoryAccess.formRepository.getOne(answerDTO.getFormId()));
			answer.setEndUserAnswer(endUserAnswer);
			answer.setQuestion(repositoryAccess.questionRepository.getOne(answerDTO.getQuestionId()));
			answer.setAnswer(answerDTO.getAnswer());
			repositoryAccess.answerRepository.save(answer);
			answerList.add(answer);
		}
		answerDTOList = new ArrayList<>();
		serviceAccess.mapperService.mapAnswerDTODTOasList(answerList, answerDTOList);
		return answerDTOList;
	}

}