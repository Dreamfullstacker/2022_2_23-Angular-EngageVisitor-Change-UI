package com.example.surveyproject.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.surveyproject.dto.*;
import com.example.surveyproject.exception.MemberShipException;
import org.apache.catalina.security.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.surveyproject.model.Form;
import com.example.surveyproject.model.Question;
import com.example.surveyproject.model.QuestionOption;
import com.example.surveyproject.repository.RepositoryAccess;
import com.example.surveyproject.util.Constant;

import javax.security.sasl.AuthenticationException;

@Service
public class QuestionService {

	@Autowired
	RepositoryAccess repositoryAccess;
	@Autowired
	ServiceAccess serviceAccess;

	public List<QuestionDTO> getAllQuestionByFormId(Long formId) {
		List<Question> questionList = repositoryAccess.questionRepository
				.findByFormOrderBySequenceAsc(repositoryAccess.formRepository.getOne(formId));
		return serviceAccess.mapperService.mapQuestionDTOasList(questionList, new ArrayList<QuestionDTO>());
	}

	public QuestionDTO getQuestionDetailByQuestionId(Long questionId) {
		QuestionDTO questionDTO = new QuestionDTO();
		List<QuestionOptionDTO> questionOptionDTOList = new ArrayList<>();
		Question question = repositoryAccess.questionRepository.findById(questionId).get();
		List<QuestionOption> questionOptionList = repositoryAccess.questionOptionRepository
				.findByQuestionOrderByCreatedDateAsc(question);
		serviceAccess.mapperService.mapQuestionDTO(question, questionDTO);
		serviceAccess.mapperService.mapQuestionOptionDTOasList(questionOptionList, questionOptionDTOList);
		if((((""+questionDTO.getQuestionTypeId()).equalsIgnoreCase(Constant.QUESTION_TYPE_CHECK_BOX))||
				(""+questionDTO.getQuestionTypeId()).equalsIgnoreCase(Constant.QUESTION_TYPE_RADIO)) && question.isShowOtherOption()){
			questionOptionDTOList = serviceAccess.mapperService.addOtherOption(questionOptionDTOList,questionDTO.getFormId(),questionDTO.getQuestId(),questionDTO.getUserId());
		}
		questionDTO.setQuestionOptionDTOList(questionOptionDTOList);
		return questionDTO;
	}

	public QuestionDTO addQuestion(QuestionDTO questionDTO) {
		return this.addEditQuestion(
				questionDTO, false);
	}

	public QuestionDTO editQuestion(QuestionDTO questionDTO) {
		return this.addEditQuestion(questionDTO, true);
	}

	public QuestionDTO deleteQuestion(QuestionDTO questionDTO) {
		List<QuestionOption> questionOptionList = repositoryAccess.questionOptionRepository
				.findByQuestionOrderByCreatedDateAsc(repositoryAccess.questionRepository.getOne(questionDTO.getId()));
		if (questionOptionList != null && !questionOptionList.isEmpty())
			repositoryAccess.questionOptionRepository.deleteAll(questionOptionList);
		repositoryAccess.questionRepository.deleteById(questionDTO.getId());
		return questionDTO;
	}

	public FormDTO getFormQuestionForResponse(Map<String,String> requestMap) {
		Form form = null;
		FormDTO formDTO = new FormDTO();
		List<Question> questionList = null;
		QuestionDTO questionDTO = null;
		List<QuestionDTO> questionDTOList = new ArrayList<>();
		List<QuestionOption> questionOptionList = null;
		List<QuestionOptionDTO> questionOptionDTOList = null;
		form = repositoryAccess.formRepository.findByFormLinkAndStatus(requestMap.remove("link"), Constant.STATUS_ACTIVE);
		if (form == null)
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "404 NOT FOUND.");
		questionList = repositoryAccess.questionRepository.findByFormAndIsHiddenOrderBySequenceAsc(form,false);
		if (questionList != null && !questionList.isEmpty()) {
			for (Question question : questionList) {
				questionDTO = new QuestionDTO();
				serviceAccess.mapperService.mapQuestionDTO(question, questionDTO);
				if (isMultipleQuestionType(String.valueOf(question.getQuestionType().getId()))) {
					questionOptionList = repositoryAccess.questionOptionRepository
							.findByQuestionOrderByCreatedDateAsc(question);
					questionOptionDTOList = new ArrayList<>();
					serviceAccess.mapperService.mapQuestionOptionDTOasList(questionOptionList,
							questionOptionDTOList);
					if((((""+questionDTO.getQuestionTypeId()).equalsIgnoreCase(Constant.QUESTION_TYPE_CHECK_BOX))||
						(""+questionDTO.getQuestionTypeId()).equalsIgnoreCase(Constant.QUESTION_TYPE_RADIO)) && question.isShowOtherOption()){
						questionOptionDTOList =serviceAccess.mapperService.addOtherOption(questionOptionDTOList,questionDTO.getFormId(),questionDTO.getQuestId(),questionDTO.getUserId());
					}
					questionDTO.setQuestionOptionDTOList(questionOptionDTOList);

				}
				questionDTOList.add(questionDTO);
			}
		}
		serviceAccess.mapperService.mapFormDTO(form, formDTO);
		formDTO.setQuestionDTOList(questionDTOList);
		List<AnswerDTO> answerDTOS = new ArrayList<>();
		requestMap.remove("isPreview");
		for(String key :requestMap.keySet()){
			AnswerDTO hiddenAnswer = new AnswerDTO();
			hiddenAnswer.setQuestionId(Long.parseLong(key));
			hiddenAnswer.setAnswer(requestMap.get(key));
			hiddenAnswer.setFormId(form.getId());
			answerDTOS.add(hiddenAnswer);
		}
		formDTO.setHiddenAnswerDto(answerDTOS);
		if(form.getUser().isPremium()) {
			formDTO.setBgType(form.getUser().getUserBrandLogoType());
			formDTO.setBgData(form.getUser().getUserBrandLogo());
		}
		return formDTO;
	}

	public QuestionDTO addEditQuestion(QuestionDTO questionDTO, Boolean isEdit) {
		Question question = null;
		List<QuestionOption> questionOptionList = null;
		List<QuestionOptionDTO> questionOptionDTOList = null;
		if (!isEdit) {
			question = new Question();
			Form form = repositoryAccess.formRepository.getOne(questionDTO.getFormId());
			if(!form.getUser().isPremium() && repositoryAccess.questionRepository.findByFormOrderBySequenceAsc(form).size()>=10 ){
				throw new MemberShipException("Please upgrade to premium plan to use more than 5 questions");
			}
			question.setForm(form);
			question.setUser(repositoryAccess.userRepository.getOne(questionDTO.getUserId()));
			question.setSequence(getSequentionNumFromForm(form));
		} else {
			question = repositoryAccess.questionRepository.findById(questionDTO.getId()).get();
			questionOptionList = repositoryAccess.questionOptionRepository
					.findByQuestionOrderByCreatedDateAsc(question);
			if (questionOptionList != null && !questionOptionList.isEmpty())
				repositoryAccess.questionOptionRepository.deleteAll(questionOptionList);
			question.setSequence(questionDTO.getSequence());
		}
		question.setQuestionType(repositoryAccess.questionTypeRepository.getOne(questionDTO.getQuestionTypeId()));
		question.setQuestion(questionDTO.getQuestion());
		question.setSequence(questionDTO.getSequence());
		question.setDescription(questionDTO.getDescription());
		question.setShowOtherOption(questionDTO.isOtherOpt());
		question.setHappyQuestion(questionDTO.getHappyQuestion());
		question.setUnHappyQuestion(questionDTO.getUnHappyQuestion());
		repositoryAccess.questionRepository.save(question);

		if (questionDTO.getQuestionOptionDTOList() != null && !questionDTO.getQuestionOptionDTOList().isEmpty()
				&& this.isMultipleQuestionType(String.valueOf(questionDTO.getQuestionTypeId()))) {

			questionOptionList = new ArrayList<>();
			questionOptionDTOList = new ArrayList<>();
			for (QuestionOptionDTO questionOptionDTO : questionDTO.getQuestionOptionDTOList()) {
				if(questionOptionDTO.getQuestionOption().equals("Other"))
					continue;
				QuestionOption questionOption = new QuestionOption();
				questionOption.setForm(repositoryAccess.formRepository.getOne(questionDTO.getFormId()));
				questionOption.setUser(repositoryAccess.userRepository.getOne(questionDTO.getUserId()));
				questionOption.setQuestion(question);
				questionOption.setNextQuestionId(questionOptionDTO.getNextQuestionId());
				questionOption.setQuestionOption(questionOptionDTO.getQuestionOption());
				questionOptionList.add(questionOption);
			}
			repositoryAccess.questionOptionRepository.saveAll(questionOptionList);
			serviceAccess.mapperService.mapQuestionOptionDTOasList(questionOptionList, questionOptionDTOList);
		}
		/*
		 * switch (String.valueOf(questionDTO.getQuestionTypeId())) { case
		 * Constant.QUESTION_TYPE_DROP_DOWN: break; case
		 * Constant.QUESTION_TYPE_CHECK_BOX: break; case Constant.QUESTION_TYPE_RADIO:
		 * break; }
		 */
		serviceAccess.mapperService.mapQuestionDTO(question, questionDTO);
		questionDTO.setQuestionOptionDTOList(questionOptionDTOList);
		return questionDTO;
	}

	public Boolean isMultipleQuestionType(String questionType) {

		if (((questionType.equals(Constant.QUESTION_TYPE_DROP_DOWN))
				|| (questionType.equals(Constant.QUESTION_TYPE_CHECK_BOX))
				|| (questionType.equals(Constant.QUESTION_TYPE_RADIO))))
			return true;
		else
			return false;

	}

	public  List<QuestionDTO> reArrangeQuestion(RearrangeDTO reArrangeQuestion) {
		List<Question> formQuestionList = repositoryAccess.questionRepository
				.findByFormOrderBySequenceAsc(repositoryAccess.formRepository.getOne(reArrangeQuestion.getFormId()));
		int high = reArrangeQuestion.getStartIndex() < reArrangeQuestion.getEndIndex() ? reArrangeQuestion.getEndIndex():reArrangeQuestion.getStartIndex();
		int low = reArrangeQuestion.getStartIndex() > reArrangeQuestion.getEndIndex() ? reArrangeQuestion.getEndIndex():reArrangeQuestion.getStartIndex();
		final int index =reArrangeQuestion.getStartIndex() > reArrangeQuestion.getEndIndex() ? 1 :-1;
		Question actualQuestion = null;
		if(index>0){
			actualQuestion = formQuestionList.get(high);
			high--;
		}else{
			actualQuestion = formQuestionList.get(low);
			low++;
		}
		List<Question> filteredQuestion = formQuestionList.subList(low,high+1);

		List<Question> updatedList = filteredQuestion.stream()
				.peek(question->question.setSequence( question.getSequence() + index))
				.collect(Collectors.toList());
		actualQuestion.setSequence(actualQuestion.getSequence()-(reArrangeQuestion.getStartIndex()-reArrangeQuestion.getEndIndex()));
		updatedList.add(actualQuestion);
		repositoryAccess.questionRepository.saveAll(updatedList);
		return getAllQuestionByFormId(reArrangeQuestion.getFormId());
	}


	private int getSequentionNumFromForm(Form form){
		Question lastQuestion = repositoryAccess.questionRepository.findTopByFormOrderBySequenceDesc(form).orElse(null);
		return lastQuestion ==null ?1 : lastQuestion.getSequence()+1;
	}

	public QuestionDTO hideShowQuestion(QuestionDTO questionDTO){
		Question question =  repositoryAccess.questionRepository.findById(questionDTO.getId()).get();
		question.setHidden(questionDTO.isHidden());
		repositoryAccess.questionRepository.saveAndFlush(question);
		serviceAccess.mapperService.mapQuestionDTO(question, questionDTO);
		return questionDTO;
	}

	public List<QuestionOptionDTO> getQuestionOptionDtoList(Question question){
		List<QuestionOptionDTO> questionOptionDTOList = new ArrayList<>();
		List<QuestionOption> questionOptionList = repositoryAccess.questionOptionRepository
				.findByQuestionOrderByCreatedDateAsc(question);
		return serviceAccess.mapperService.mapQuestionOptionDTOasList(questionOptionList, questionOptionDTOList);
	}

}