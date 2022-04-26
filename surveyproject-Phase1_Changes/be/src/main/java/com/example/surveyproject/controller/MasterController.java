package com.example.surveyproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.surveyproject.dto.ResponseDTO;
import com.example.surveyproject.service.ServiceAccess;
import com.example.surveyproject.util.Constant;

@RestController
@RequestMapping("master")
public class MasterController {

	@Autowired
	ServiceAccess serviceAccess;

	@GetMapping(path = "/getQuestionType")
	public ResponseDTO getQuestionType() {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK, null,
				serviceAccess.utilService.getQuestionType());
	}

}
