package com.example.surveyproject.controller;

import java.util.ArrayList;
import java.util.List;

import com.example.surveyproject.dto.EndUserAnswerDTO;
import com.example.surveyproject.exception.MemberShipException;
import com.example.surveyproject.model.EndUserAnswer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.surveyproject.dto.AnswerDTO;
import com.example.surveyproject.dto.ResponseDTO;
import com.example.surveyproject.service.ServiceAccess;
import com.example.surveyproject.util.Constant;

@RestController
@RequestMapping("answer")
public class AnswerController {

	@Autowired
	ServiceAccess serviceAccess;

	@GetMapping(path = "/getAllAnswerByFormId/{formId}")
	public ResponseDTO getAllEndUserAnswerByFormId(@PathVariable Long formId) {
		List<EndUserAnswerDTO> answerList = new ArrayList<>();
		int totalResponse =0;
		try{
			totalResponse = serviceAccess.answerService.getEndUserAnswerByFormId(formId,answerList);
			if(totalResponse < 0)
				throw new MemberShipException("Please Upgrade to Premium membership to show all responses");
			return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK, totalResponse,
				answerList);
		}catch(MemberShipException e) {
			return new ResponseDTO(Constant.STATUS_CODE_403, e.getMessage(), totalResponse *-1,
					answerList);
		}
	}

	@GetMapping(path = "/getAnswerDetailByEndUserIdAndFormId/{endUserId}/{formId}")
	public ResponseDTO getAnswerDetail(@PathVariable Long endUserId, @PathVariable Long formId) {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK,
				serviceAccess.answerService.getAnswerByEndUserId(endUserId, formId), null);
	}

	@GetMapping(path = "/getAllAnswerDetailByFormId/{formId}")
	public ResponseDTO getAllAnswerDetailByFormId(@PathVariable Long formId) {
		List<EndUserAnswerDTO> answerList = new ArrayList<>();
		try{
			serviceAccess.answerService.getAllAnswerDetailByFormId(formId,answerList);
			return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK,answerList, null);
		}catch (MemberShipException e){
			return new ResponseDTO(Constant.STATUS_CODE_403, e.getMessage(), answerList,null
					);
		}
	}

	

}
