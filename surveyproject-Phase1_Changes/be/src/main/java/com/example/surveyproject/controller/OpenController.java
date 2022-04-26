package com.example.surveyproject.controller;

import com.example.surveyproject.dto.AnswerDTO;
import com.example.surveyproject.dto.ResponseDTO;
import com.example.surveyproject.dto.UserDTO;
import com.example.surveyproject.exception.MemberShipException;
import com.example.surveyproject.repository.RepositoryAccess;
import com.example.surveyproject.service.ServiceAccess;
import com.example.surveyproject.util.Constant;
import com.sun.el.parser.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("open")
public class OpenController {

	@Autowired
	ServiceAccess serviceAccess;

	@Autowired
	RepositoryAccess repo;

	@PostMapping(path = "/user/createUser")
	public ResponseDTO createUser(@RequestBody UserDTO userDTO) {
		try {
			return new ResponseDTO(Constant.STATUS_CODE_201, "User created successfully.",
					serviceAccess.userService.createUser(userDTO), null);
		} catch (InvalidAlgorithmParameterException | IllegalBlockSizeException | NoSuchPaddingException | InvalidKeySpecException
				|NoSuchAlgorithmException| BadPaddingException | InvalidKeyException | MemberShipException e) {
			throw new MemberShipException("Invalid Coupon code");
		}
	}

	@PostMapping(path = "/user/forgotPassword")
	public ResponseDTO forgotPasrsword(@RequestBody UserDTO userDTO) throws TemplateNotFoundException,
			MalformedTemplateNameException, MessagingException, ParseException, IOException, TemplateException {
		return new ResponseDTO(Constant.STATUS_CODE_201,
				"You password has been reset. Kindly refer your mail to check your resetted password.",
				serviceAccess.userService.forgotPassword(userDTO), null);
	}

	@GetMapping(value = "/question/getFormQuestionForResponse")
	public ResponseDTO getFormQuestionForResponse(@RequestParam Map<String,String> searchParams) {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK,
				serviceAccess.questionService.getFormQuestionForResponse(searchParams), null);
	}

	@PostMapping(path = "/answer/addAnswer")
	public ResponseDTO addAnswer(@RequestBody List<AnswerDTO> answerDTOList) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Response has been submitted successfully.",
				serviceAccess.answerService.addAnswer(answerDTOList), null);
	}

	@PostMapping(value = "/payment/webhook", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	private ResponseDTO webhook(HttpEntity<String> httpEntity) throws UnsupportedEncodingException {

		boolean isValid = serviceAccess.verifierService.verifyDataWithSignature(httpEntity.getBody());

		if (!isValid) {
			throw new IllegalArgumentException("Error While updating licence detail please contact support team");
		}

		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK,
				null, null);
	}

//	@PostMapping(path = "/addPromoInDB")
//	public ResponseDTO addPromo() throws IOException {
//		//File excel = new File(getClass().getResource("coupon_codes.xlsx").getFile());
//
//		XSSFWorkbook wb=new XSSFWorkbook(getClass().getResourceAsStream("/coupon_codes.xlsx"));
////creating a Sheet object to retrieve the object
//		XSSFSheet sheet=wb.getSheetAt(0);
////evaluating cell type
//		FormulaEvaluator formulaEvaluator=wb.getCreationHelper().createFormulaEvaluator();
//		int i =0;
//		for(Row row: sheet)     //iteration over row using for each loop
//		{
//			if(i==0) {
//				i++;
//				continue;
//			}
//			CouponDetails cd = new CouponDetails();
//			cd.setCouponCode(new DataFormatter().formatCellValue(row.getCell(1)));
//			cd.setDuration(-1);
//			cd.setSerial(new DataFormatter().formatCellValue(row.getCell(2)));
//			cd.setUsed(false);
//			cd.setActive(true);
//			repo.couponDetailsRepository.save(cd);
//		}
//		return null;
//	}

}
