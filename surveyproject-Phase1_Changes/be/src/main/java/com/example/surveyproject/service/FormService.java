package com.example.surveyproject.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.example.surveyproject.dto.QuestionDTO;
import com.example.surveyproject.exception.MemberShipException;
import com.example.surveyproject.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.surveyproject.dto.FormDTO;
import com.example.surveyproject.repository.RepositoryAccess;
import com.example.surveyproject.util.Constant;

@Service
public class FormService {

	@Autowired
	RepositoryAccess repositoryAccess;
	@Autowired
	ServiceAccess serviceAccess;
	@Autowired
	MediatorService mediatorService;

	public FormDTO getFormById(Long formId) {
		FormDTO formDTO = new FormDTO();
		Form form = repositoryAccess.formRepository.findByIdAndStatus(formId, Constant.STATUS_ACTIVE);
		serviceAccess.mapperService.mapFormDTO(form, formDTO);
		List<QuestionDTO> questionDTOS = new ArrayList<>();
		formDTO.setQuestionDTOList(serviceAccess.mapperService.mapQuestionDTOasList(repositoryAccess.questionRepository.findByFormAndIsHiddenOrderBySequenceAsc(form,true),
				questionDTOS));
		formDTO.setQuestionDTOList(questionDTOS);
		return formDTO;
	}

	public List<FormDTO> getAllFormByUserId(Long userId) {
		List<FormDTO> formDTOList = new ArrayList<>();
		List<Form> formList = repositoryAccess.formRepository.findByUserAndStatusOrderByCreatedDateDesc(
				repositoryAccess.userRepository.getOne(userId), Constant.STATUS_ACTIVE);
		serviceAccess.mapperService.mapFormDTOasList(formList, formDTOList);
		for (FormDTO formDTO : formDTOList) {
			formDTO.setTotalResponse(repositoryAccess.endUserAnswerRepository
					.countByForm(repositoryAccess.formRepository.getOne(formDTO.getId())));
		}
		return formDTOList;
	}

	public List<FormDTO> getAllTemplatesList() {
		List<FormDTO> formDTOList = new ArrayList<>();
		List<Form> formList = repositoryAccess.formRepository.findByIsTemplateAndStatusAndVisibilityStatus(true, Constant.STATUS_ACTIVE,Constant.FORM_VISIBILITY_STATUS_PUBLISHED);
		serviceAccess.mapperService.mapFormDTOasList(formList, formDTOList);
		for (FormDTO formDTO : formDTOList) {
			List<QuestionDTO> questionDTOS = new ArrayList<>();
			formDTO.setQuestionDTOList(serviceAccess.mapperService.mapQuestionDTOasList(repositoryAccess.questionRepository.findByFormIdOrderBySequenceAsc(formDTO.getId()),
							questionDTOS));
		}
		return formDTOList;
	}

	public FormDTO createForm(FormDTO formDTO) {
		Form form = new Form();
		User user = repositoryAccess.userRepository.getOne(formDTO.getUserId());
		boolean isPremium = user.isPremium();
		if(!isPremium && repositoryAccess.formRepository.findByUserAndStatusOrderByCreatedDateDesc(user,Constant.STATUS_ACTIVE).size() >=5)
			throw new MemberShipException("Please upgrade to premium plan to create more than 5 forms");
		form.setUser(user);
		form.setTitle(formDTO.getTitle());
		form.setDescription(formDTO.getDescription());
		form.setFormLink(this.getUniqueFormLink());
		form.setStatus(Constant.STATUS_ACTIVE);
		form.setVisibilityStatus(Constant.FORM_VISIBILITY_STATUS_PUBLISHED);
		form.setPremium(isPremium);
		if(formDTO.getThankYouMessage() !=null)
			form.setThankYouMessage(formDTO.getThankYouMessage());
		if(formDTO.getRedirectUrl() !=null)
			form.setRedirectUrl(formDTO.getRedirectUrl());

		if(user.getUserType().equals(USERTYPE.TEMPLATE_CREATOR))
			form.setTemplate(true);

		repositoryAccess.formRepository.save(form);
		mediatorService.addTemplateQuestions(form,formDTO);
		return serviceAccess.mapperService.mapFormDTO(form, formDTO);
	}

	public FormDTO renameForm(FormDTO formDTO) {
		Form form = repositoryAccess.formRepository.findById(formDTO.getId()).get();
		form.setDescription(formDTO.getDescription());
		form.setTitle(formDTO.getTitle());
		if(formDTO.getThankYouMessage() !=null)
			form.setThankYouMessage(formDTO.getThankYouMessage());
		if(formDTO.getRedirectUrl() !=null)
			form.setRedirectUrl(formDTO.getRedirectUrl());
		repositoryAccess.formRepository.save(form);
		return serviceAccess.mapperService.mapFormDTO(form, formDTO);
	}

	public FormDTO publishForm(FormDTO formDTO) {
		Form form = repositoryAccess.formRepository.findById(formDTO.getId()).get();
		form.setVisibilityStatus(Constant.FORM_VISIBILITY_STATUS_PUBLISHED);
		repositoryAccess.formRepository.save(form);
		return serviceAccess.mapperService.mapFormDTO(form, formDTO);
	}

	public FormDTO unpublishForm(FormDTO formDTO) {
		Form form = repositoryAccess.formRepository.findById(formDTO.getId()).get();
		form.setVisibilityStatus(Constant.FORM_VISIBILITY_STATUS_UNPUBLISHED);
		repositoryAccess.formRepository.save(form);
		return serviceAccess.mapperService.mapFormDTO(form, formDTO);
	}

	public FormDTO hideDefaultPage(FormDTO formDTO) {
		Form form = repositoryAccess.formRepository.findById(formDTO.getId()).get();
		form.setWelcomePageVisibility(formDTO.getWelcomePageVisibility());
		form.setThanksPageVisibility(formDTO.getThanksPageVisibility());
		repositoryAccess.formRepository.save(form);
		return serviceAccess.mapperService.mapFormDTO(form, formDTO);
	}
	public FormDTO deleteForm(FormDTO formDTO) {
		Form form = repositoryAccess.formRepository.getOne(formDTO.getId());
		form.setStatus(Constant.STATUS_DELETE);
		repositoryAccess.formRepository.save(form);
		return serviceAccess.mapperService.mapFormDTO(form, formDTO);
	}


	public Theme storeBackgroundDetail(String file, long formId,String type) throws IOException {
		Form form =  repositoryAccess.formRepository.findById(formId).get();
		Theme theme = form.getTheme();
		if(theme == null)
			theme = new Theme();

		theme.setBgType(type);
		theme.setBackgroundData(file);
		repositoryAccess.theme.save(theme);
		form.setTheme(theme);

		repositoryAccess.formRepository.saveAndFlush(form);
		return theme;

	}

	public void saveTheme(Theme theme){
		repositoryAccess.theme.save(theme);
	}

	public FormDTO SetTheme(FormDTO formDTO) {
		Form form = repositoryAccess.formRepository.findById(formDTO.getId()).get();
		form.setTheme(formDTO.getTheme());
		repositoryAccess.formRepository.save(form);
		return formDTO;
	}
	public FormDTO removeTheme(FormDTO formDTO){
		Form form = repositoryAccess.formRepository.findById(formDTO.getId()).get();
		form.setTheme(null);
		repositoryAccess.formRepository.save(form);
		return serviceAccess.mapperService.mapFormDTO(form, formDTO);
	}
	public String getUniqueFormLink() {
		return String.valueOf(System.currentTimeMillis());
	}

}