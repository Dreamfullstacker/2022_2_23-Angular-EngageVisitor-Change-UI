package com.example.surveyproject.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.example.surveyproject.exception.MemberShipException;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.surveyproject.dto.AnswerDTO;
import com.example.surveyproject.dto.EndUserAnswerDTO;
import com.example.surveyproject.dto.FormDTO;
import com.example.surveyproject.dto.QuestionDTO;
import com.example.surveyproject.dto.QuestionOptionDTO;
import com.example.surveyproject.dto.QuestionTypeDTO;
import com.example.surveyproject.dto.UserDTO;
import com.example.surveyproject.model.Answer;
import com.example.surveyproject.model.EndUserAnswer;
import com.example.surveyproject.model.Form;
import com.example.surveyproject.model.Question;
import com.example.surveyproject.model.QuestionOption;
import com.example.surveyproject.model.QuestionType;
import com.example.surveyproject.model.User;

@Service
public class MapperService {

	@Autowired
	public DozerBeanMapper dozerMapper;

	@Autowired
	public MediatorService mediator;

	public UserDTO mapUserDTO(User user, UserDTO userDTO) {
		dozerMapper.map(user, userDTO);
		return userDTO;
	}

	public List<UserDTO> mapUserDTOasList(List<User> userList, List<UserDTO> userDTOList) {
		if (userList != null && !userList.isEmpty()) {
			for (User user : userList) {
				userDTOList.add(this.mapUserDTO(user, new UserDTO()));
			}
		}
		return userDTOList;
	}

	public QuestionTypeDTO mapQuestionTypeDTO(QuestionType questionType, QuestionTypeDTO questionTypeDTO) {
		dozerMapper.map(questionType, questionTypeDTO);
		return questionTypeDTO;
	}

	public List<QuestionTypeDTO> mapQuestionTypeDTOasList(List<QuestionType> questionTypeList,
			List<QuestionTypeDTO> QuestionTypeDTOList) {
		if (questionTypeList != null && !questionTypeList.isEmpty()) {
			for (QuestionType questionType : questionTypeList) {
				QuestionTypeDTOList.add(this.mapQuestionTypeDTO(questionType, new QuestionTypeDTO()));
			}
		}
		return QuestionTypeDTOList;
	}

	public FormDTO mapFormDTO(Form form, FormDTO formDTO) {
		dozerMapper.map(form, formDTO);
		formDTO.setUserId(form.getUser().getId());
		formDTO.setTheme(form.getTheme());
		return formDTO;
	}

	public List<FormDTO> mapFormDTOasList(List<Form> formList, List<FormDTO> formDTOList) {
		if (formList != null && !formList.isEmpty()) {
			for (Form form : formList) {
				formDTOList.add(this.mapFormDTO(form, new FormDTO()));
			}
		}
		return formDTOList;
	}

	public QuestionDTO mapQuestionDTO(Question question, QuestionDTO questionDTO) {
		dozerMapper.map(question, questionDTO);
		questionDTO.setUserId(question.getUser().getId());
		questionDTO.setFormId(question.getForm().getId());
		questionDTO.setQuestionTypeId(question.getQuestionType().getId());
		questionDTO.setSequence(question.getSequence());
		questionDTO.setQuestId(question.getId());
		questionDTO.setBackground(question.getBackgroundData());
		questionDTO.setBackgroundType(question.getBgType());
		questionDTO.setOtherOpt(question.isShowOtherOption());
		questionDTO.setHappyQuestion(question.getHappyQuestion());
		questionDTO.setUnHappyQuestion(question.getUnHappyQuestion());
		questionDTO.setQuestionOptionDTOList(mediator.getQuestionOptionDtoList(question));
		return questionDTO;
	}

	public List<QuestionDTO> mapQuestionDTOasList(List<Question> questionList, List<QuestionDTO> questionDTOList) {
		if (questionList != null && !questionList.isEmpty()) {
			for (Question question : questionList) {
				questionDTOList.add(this.mapQuestionDTO(question, new QuestionDTO()));
			}
		}
		return questionDTOList;
	}

	public QuestionOptionDTO mapQuestionOptionDTO(QuestionOption questionOption, QuestionOptionDTO questionOptionDTO) {
		dozerMapper.map(questionOption, questionOptionDTO);
		questionOptionDTO.setUserId(questionOption.getUser().getId());
		questionOptionDTO.setFormId(questionOption.getForm().getId());
		questionOptionDTO.setQuestionId(questionOption.getQuestion().getId());
		questionOptionDTO.setNextQuestionId(questionOption.getNextQuestionId());
		questionOptionDTO.setId(questionOption.getId());
		return questionOptionDTO;
	}

	public List<QuestionOptionDTO> mapQuestionOptionDTOasList(List<QuestionOption> questionOptionList,
			List<QuestionOptionDTO> questionOptionDTOList) {
		if (questionOptionList != null && !questionOptionList.isEmpty()) {
			for (QuestionOption questionOption : questionOptionList) {
				questionOptionDTOList.add(this.mapQuestionOptionDTO(questionOption, new QuestionOptionDTO()));
			}
		}
		return questionOptionDTOList;
	}

	public List<QuestionOptionDTO>  addOtherOption(List<QuestionOptionDTO> questionOptionDTOList,long formID,long questionId,long userID){
		List<QuestionOptionDTO> filteredQuestionOptionList =questionOptionDTOList.stream()
				.filter(questOption -> !questOption.getQuestionOption().equalsIgnoreCase("other"))
				.sorted(Comparator.comparing(QuestionOptionDTO::getId))
				.collect(Collectors.toList());
		QuestionOptionDTO otherOption = new QuestionOptionDTO();
		otherOption.setFormId(formID);
		otherOption.setQuestionId(questionId);
		otherOption.setQuestionOption("Other");
		otherOption.setUserId(userID);
		otherOption.setOther(true);
		filteredQuestionOptionList.add(otherOption);
		return filteredQuestionOptionList;

	}

	public EndUserAnswerDTO mapEndUserAnswerDTO(EndUserAnswer endUserAnswer, EndUserAnswerDTO endUserAnswerDTO) {
		dozerMapper.map(endUserAnswer, endUserAnswerDTO);
		endUserAnswerDTO.setUserId(endUserAnswer.getUser().getId());
		endUserAnswerDTO.setFormId(endUserAnswer.getForm().getId());
		return endUserAnswerDTO;
	}

	public List<EndUserAnswerDTO> mapEndUserAnswerDTOasList(List<EndUserAnswer> endUserAnswerList,
			List<EndUserAnswerDTO> endUserAnswerDTOList) {
		if (endUserAnswerList != null && !endUserAnswerList.isEmpty()) {

			int answers =0;
			for (EndUserAnswer endUserAnswer : endUserAnswerList) {

				endUserAnswerDTOList.add(this.mapEndUserAnswerDTO(endUserAnswer, new EndUserAnswerDTO()));
			}
		}
		return endUserAnswerDTOList;
	}

	public AnswerDTO mapAnswerDTO(Answer answer, AnswerDTO answerDTO) {
		dozerMapper.map(answer, answerDTO);
		answerDTO.setUserId(answer.getUser().getId());
		answerDTO.setFormId(answer.getForm().getId());
		answerDTO.setQuestionId(answer.getQuestion().getId());
		answerDTO.setEndUserAnswerId(answer.getEndUserAnswer().getId());
		return answerDTO;
	}

	public List<AnswerDTO> mapAnswerDTODTOasList(List<Answer> answerList, List<AnswerDTO> answerDTOList) {
		if (answerList != null && !answerList.isEmpty()) {
			for (Answer answer : answerList) {
				answerDTOList.add(this.mapAnswerDTO(answer, new AnswerDTO()));
			}
		}
		return answerDTOList;
	}

}
