package com.example.surveyproject.controller;

import com.example.surveyproject.dto.ResponseDTO;
import com.example.surveyproject.dto.UserDTO;
import com.example.surveyproject.exception.MemberShipException;
import com.example.surveyproject.model.CouponDetails;
import com.example.surveyproject.service.ServiceAccess;
import com.example.surveyproject.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("user")
public class UserController {

	@Autowired
	ServiceAccess serviceAccess;

	@GetMapping(path = "/getUserById/{userId}")
	public ResponseDTO getUserById(@PathVariable Long userId) {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK,
				serviceAccess.userService.getUserById(userId), null);

	}

	@PostMapping(path = "/cancelBilling")
	public ResponseDTO getUserById(@RequestBody UserDTO userDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK,
				serviceAccess.userService.cancelBilling(userDTO), null);

	}

//	@PostMapping(path = "/createUser")
//	public ResponseDTO createUser(@RequestBody UserDTO userDTO) {
//		return new ResponseDTO(Constant.STATUS_CODE_201, "User created successfully.",
//				serviceAccess.userService.createUser(userDTO), null);
//	}

	@PostMapping(path = "/updateUser")
	public ResponseDTO updateUser(@RequestBody UserDTO userDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "User updated successfully.",
				serviceAccess.userService.updateUser(userDTO), null);
	}

	@PostMapping(path = "/updatePassword")
	public ResponseDTO updatePassword(@RequestBody UserDTO userDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Password updated successfully.",
				serviceAccess.userService.updatePassword(userDTO), null);
	}


	@PostMapping(path = "/applyPromo")
	public ResponseDTO applyPromo(@RequestBody CouponDetails couponDetails) throws InvalidAlgorithmParameterException, IllegalBlockSizeException, NoSuchPaddingException, InvalidKeySpecException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
		try {
			return new ResponseDTO(Constant.STATUS_CODE_201, "Coupon code applied Successfully.",
					serviceAccess.userService.applyPromoCode(couponDetails), null);
		}catch(Exception e) {
				return new ResponseDTO(Constant.STATUS_CODE_403, e.getMessage(), null,
						null);
			}
		}

	@PostMapping(path = "/checkAccess")
	public ResponseDTO checkAccess(@RequestBody UserDTO userDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Password updated successfully.",
				serviceAccess.utilService.isPremiumUser(userDTO.getId()), null);
	}
	@PostMapping(path = "/setBrandLogo")
	public ResponseDTO uploadFile(@RequestParam("encodedFileData") String file, @RequestParam("id")long userId, @RequestParam("type") String type) throws IOException {
		try {
			return new ResponseDTO(Constant.STATUS_CODE_201, "Custom logo updated", serviceAccess.userService.setCustomLogo(file, userId, type), null
			);
		}catch (MemberShipException ex){
			return new ResponseDTO(Constant.STATUS_CODE_403,ex.getMessage(),null,null);
		}
	}

//	@PostMapping(path = "/forgotPassword")
//	public ResponseDTO forgotPassword(@RequestBody UserDTO userDTO) throws TemplateNotFoundException,
//			MalformedTemplateNameException, MessagingException, ParseException, IOException, TemplateException {
//		return new ResponseDTO(Constant.STATUS_CODE_201,
//				"You password has been reset. Kindly refer your mail to check your resetted password.",
//				serviceAccess.userService.forgotPassword(userDTO), null);
//	}

}
