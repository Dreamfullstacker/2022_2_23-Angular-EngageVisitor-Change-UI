package com.example.surveyproject.controller;

import com.example.surveyproject.dto.RearrangeDTO;
import com.example.surveyproject.exception.MemberShipException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.surveyproject.dto.QuestionDTO;
import com.example.surveyproject.dto.ResponseDTO;
import com.example.surveyproject.service.ServiceAccess;
import com.example.surveyproject.util.Constant;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("question")
public class QuestionController {

	@Autowired
	ServiceAccess serviceAccess;

	@GetMapping(path = "/getAllQuestionByFormId/{formId}")
	public ResponseDTO getAllQuestionByFormId(@PathVariable Long formId) {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK, null,
				serviceAccess.questionService.getAllQuestionByFormId(formId));
	}

	@GetMapping(path = "/getQuestionDetailByQuestionId/{questionId}")
	public ResponseDTO getQuestionDetailByQuestionId(@PathVariable Long questionId) {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK,
				serviceAccess.questionService.getQuestionDetailByQuestionId(questionId), null);
	}

	@PostMapping(path = "/addQuestion")
	public ResponseDTO addQuestion(@RequestBody QuestionDTO questionDTO) {
		try{
		return new ResponseDTO(Constant.STATUS_CODE_201, "question created successfully.",
				serviceAccess.questionService.addQuestion(questionDTO), null);
		}catch (MemberShipException e){
			return new ResponseDTO(Constant.STATUS_CODE_403, e.getMessage(),
					null, null);
		}
	}

	@PostMapping(path = "/editQuestion")
	public ResponseDTO editQuestion(@RequestBody QuestionDTO questionDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "question updated successfully.",
				serviceAccess.questionService.editQuestion(questionDTO), null);
	}

	@PostMapping(path = "/deleteQuestion")
	public ResponseDTO deleteQuestion(@RequestBody QuestionDTO questionDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "question deleted successfully.",
				serviceAccess.questionService.deleteQuestion(questionDTO), null);
	}

	@PostMapping(path = "/reArrangeQuestion")
	public ResponseDTO reArrangeQuestion(@RequestBody RearrangeDTO reArrangeQuestion) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "question sequence updated.",null,
				serviceAccess.questionService.reArrangeQuestion(reArrangeQuestion));
	}


	@PostMapping(path = "/hideShowQuestion")
	public ResponseDTO hideQuestion(@RequestBody QuestionDTO questionDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "question sequence updated.",
				serviceAccess.questionService.hideShowQuestion(questionDTO),null);
	}




}
