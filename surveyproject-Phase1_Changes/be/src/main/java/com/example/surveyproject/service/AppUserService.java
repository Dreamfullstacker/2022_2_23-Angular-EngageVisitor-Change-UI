package com.example.surveyproject.service;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Optional;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.mail.MessagingException;
import javax.swing.text.html.Option;

import com.example.surveyproject.exception.MemberShipException;
import com.example.surveyproject.model.CouponDetails;
import com.example.surveyproject.model.PaymentDetails;
import com.google.common.base.Strings;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.surveyproject.dto.UserDTO;
import com.example.surveyproject.model.User;
import com.example.surveyproject.repository.RepositoryAccess;
import com.example.surveyproject.util.Constant;
import com.example.surveyproject.util.EmailModel;
import com.sun.el.parser.ParseException;

import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

@Service
public class AppUserService {

	@Autowired
	RepositoryAccess repositoryAccess;
	@Autowired
	ServiceAccess serviceAccess;
	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	public UserDTO findUserByEmail(String email) {
		User user = repositoryAccess.userRepository.findByEmail(email);
		UserDTO userDTO = new UserDTO();
		serviceAccess.mapperService.mapUserDTO(user, userDTO);
		return userDTO;
	}

	public UserDTO getUserById(Long userId) {
		User user = repositoryAccess.userRepository.findByIdAndStatus(userId, Constant.STATUS_ACTIVE);
		List<PaymentDetails> paymentList= repositoryAccess.paymentRepository.findByEmailAndAlertNameOrderByIdDesc(user.getEmail(),"subscription_created");
		UserDTO userDTO = new UserDTO();
		serviceAccess.mapperService.mapUserDTO(user, userDTO);
		if(paymentList!=null && !paymentList.isEmpty() && paymentList.get(0)!=null && user.isPremium()) {
			PaymentDetails pd =paymentList.get(0);
			userDTO.setSubId(pd.getAlert_id());
			userDTO.setCancelUrl(pd.getCancel_url());
			userDTO.setSubDate(pd.getEvent_time());
			userDTO.setSubAmount(pd.getUnit_price() + " " + pd.getCurrency());
			userDTO.setNextDate(pd.getNext_bill_date());
		}
		return userDTO;
	}

	public UserDTO cancelBilling(UserDTO user){
		List<PaymentDetails> paymentList= repositoryAccess.paymentRepository.findByEmailAndAlertNameOrderByIdDesc(user.getEmail(),"subscription_created");
		if(paymentList!=null && !paymentList.isEmpty() && paymentList.get(0)!=null) {

			PaymentDetails pd =paymentList.get(0);
			pd.setCancel_url("");
			pd.setNext_bill_date("Membership Cancelled");
			repositoryAccess.paymentRepository.save(pd);
		}
		return getUserById(user.getId());
	}

	public UserDTO createUser(UserDTO userDTO) throws InvalidAlgorithmParameterException, IllegalBlockSizeException, NoSuchPaddingException, InvalidKeySpecException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
		User user = repositoryAccess.userRepository.findByEmail(userDTO.getEmail());
		if (user != null)
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"Email already registered. Try logging in instead.");
		else
			user = new User();
		user.setEmail(userDTO.getEmail());
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		user.setPassword(this.passwordEncoder.encode(userDTO.getPassword()));
		user.setStatus(Constant.STATUS_ACTIVE);
		PaymentDetails payment =null;
		Optional<CouponDetails> couponDetails =null;
		if(!Strings.isNullOrEmpty(userDTO.getPromoCode())){
			couponDetails = repositoryAccess.couponDetailsRepository.findByCouponCodeAndIsUsedAndIsActive(userDTO.getPromoCode(),false,true);
			if(couponDetails.isPresent()) {
				payment = serviceAccess.verifierService.applyPromo(user, couponDetails.get());
			}else{
				throw new MemberShipException("Error While Applying coupon");
			}
		}
		repositoryAccess.userRepository.save(user);
		if(payment !=null && couponDetails !=null && couponDetails.isPresent())
			serviceAccess.verifierService.saveDetails(user,payment,couponDetails.get());
		return serviceAccess.mapperService.mapUserDTO(user, userDTO);
	}

	public UserDTO updateUser(UserDTO userDTO) {
		User user = repositoryAccess.userRepository.findById(userDTO.getId()).get();
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		repositoryAccess.userRepository.save(user);
		return serviceAccess.mapperService.mapUserDTO(user, userDTO);
	}

	public UserDTO updatePassword(UserDTO userDTO) {
		User user = repositoryAccess.userRepository.findById(userDTO.getId()).get();
		user.setPassword(this.passwordEncoder.encode(userDTO.getPassword()));
		repositoryAccess.userRepository.save(user);
		return serviceAccess.mapperService.mapUserDTO(user, userDTO);
	}
	public UserDTO applyPromoCode(CouponDetails coupon) throws InvalidAlgorithmParameterException, IllegalBlockSizeException, NoSuchPaddingException, InvalidKeySpecException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
		User user = repositoryAccess.userRepository.findById(coupon.getUserId()).get();
		Optional<CouponDetails> couponDetails = repositoryAccess.couponDetailsRepository.findByCouponCodeAndIsUsedAndIsActive(coupon.getCouponCode(),false,true);
		if(couponDetails.isPresent()){
			PaymentDetails payment = serviceAccess.verifierService.applyPromo(user,couponDetails.get());
			repositoryAccess.userRepository.save(user);
			serviceAccess.verifierService.saveDetails(user,payment,couponDetails.get());
			return serviceAccess.mapperService.mapUserDTO(user, new UserDTO());
		}else{
			throw new MemberShipException("Invalid Promo code");
		}
	}



	public UserDTO forgotPassword(UserDTO userDTO) throws TemplateNotFoundException, MalformedTemplateNameException,
			MessagingException, ParseException, IOException, TemplateException {
		EmailModel emailModel = new EmailModel();
		String newRandomPassword = getRandomPassword();
		User user = repositoryAccess.userRepository.findByEmail(userDTO.getEmail());
		if (user == null)
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Email Address.");
		user.setPassword(this.passwordEncoder.encode(newRandomPassword));
		repositoryAccess.userRepository.save(user);
		emailModel.setTo(user.getEmail());
		emailModel.setSubject("You password has been reset.");
		emailModel.getModel().put("password", newRandomPassword);
		emailModel.getModel().put("name", user.getFirstName() + (user.getLastName() != null ? " " + user.getLastName() : ""));
		serviceAccess.util.sendMail(emailModel, "ForgotPassword.ftl");
		return serviceAccess.mapperService.mapUserDTO(user, userDTO);
	}

	public static String getRandomPassword() {
		return RandomStringUtils.random(8, true, true);
	}

	public UserDTO setCustomLogo(String file, long userId, String type){
		User user =  repositoryAccess.userRepository.findById(userId).get();
		if(!user.isPremium()){
			throw new MemberShipException("You need to subscribe premium membership for setting custom logo");
		}

		user.setUserBrandLogoType(type);
		user.setUserBrandLogo(file);

		repositoryAccess.userRepository.saveAndFlush(user);
		return serviceAccess.mapperService.mapUserDTO(user, new UserDTO());

	}
}