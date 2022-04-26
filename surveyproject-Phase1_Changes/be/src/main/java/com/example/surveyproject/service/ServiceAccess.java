package com.example.surveyproject.service;

import com.example.surveyproject.util.Util;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceAccess {

	@Autowired
	public AppUserService userService;

	@Autowired
	public AnswerService answerService;

	@Autowired
	public QuestionService questionService;

	@Autowired
	public FormService formService;

	@Autowired
	public UtilService utilService;

	@Autowired
	public EntityFinder entityFinder;

	@Autowired
	public DozerBeanMapper mapper;

	@Autowired
	public VerifierService verifierService;

	@Autowired
	public MapperService mapperService;
	@Autowired
	public Util util;

}
