package com.example.surveyproject.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.surveyproject.service.MapperService;
import com.example.surveyproject.util.Util;

@Service
public class RepositoryAccess {

	@Autowired
	public UserRepository userRepository;
	@Autowired
	public FormRepository formRepository;
	@Autowired
	public QuestionRepository questionRepository;
	@Autowired
	public QuestionTypeRepository questionTypeRepository;
	@Autowired
	public QuestionOptionRepository questionOptionRepository;
	@Autowired
	public AnswerRepository answerRepository;
	@Autowired
	public EndUserAnswerRepository endUserAnswerRepository;
	@Autowired
	public PaymentRepository paymentRepository;
	@Autowired
	public ThemeRepository theme;
	@Autowired
	public CouponDetailsRepository couponDetailsRepository;

}
