package com.example.surveyproject.controller;

import com.example.surveyproject.exception.MemberShipException;
import com.example.surveyproject.model.Theme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.surveyproject.dto.FormDTO;
import com.example.surveyproject.dto.ResponseDTO;
import com.example.surveyproject.service.ServiceAccess;
import com.example.surveyproject.util.Constant;

import java.io.IOException;

@RestController
@RequestMapping("form")
public class FormController {

	@Autowired
	ServiceAccess serviceAccess;

	@CrossOrigin("*")
	@GetMapping(path = "/getAllFormByUserId/{userId}")
	public ResponseDTO getAllFormByUserId(@PathVariable Long userId) {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK, null,
				serviceAccess.formService.getAllFormByUserId(userId));
	}

	@PostMapping(path = "/getAllTemplates")
	public ResponseDTO getAllTemplates() {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK, null,
				serviceAccess.formService.getAllTemplatesList());
	}

	@GetMapping(path = "/getFormById/{formId}")
	public ResponseDTO getFormById(@PathVariable Long formId) {
		return new ResponseDTO(Constant.STATUS_CODE_200, Constant.MESSAGE_OK,
				serviceAccess.formService.getFormById(formId), null);
	}

	@PostMapping(path = "/createForm")
	public ResponseDTO createForm(@RequestBody FormDTO formDTO) {
		try {
			return new ResponseDTO(Constant.STATUS_CODE_201, "Form created successfully.",
					serviceAccess.formService.createForm(formDTO), null);
		}catch (MemberShipException e){
			return new ResponseDTO(Constant.STATUS_CODE_403, e.getMessage(),
					null, null);
		}
	}

	@PostMapping(path = "/renameForm")
	public ResponseDTO renameForm(@RequestBody FormDTO formDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Form renamed successfully.",
				serviceAccess.formService.renameForm(formDTO), null);
	}

	@PostMapping(path = "/publishForm")
	public ResponseDTO publishForm(@RequestBody FormDTO formDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Form has been published successfully.",
				serviceAccess.formService.publishForm(formDTO), null);
	}

	@PostMapping(path = "/unpublishForm")
	public ResponseDTO unpublishForm(@RequestBody FormDTO formDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Form has been unpublised successfully.",
				serviceAccess.formService.unpublishForm(formDTO), null);
	}

	@PostMapping(path = "/deleteForm")
	public ResponseDTO deleteFormById(@RequestBody FormDTO formDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Form deleted successfully.",
				serviceAccess.formService.deleteForm(formDTO), null);
	}
	@PostMapping(path = "/deleteDefaultPage")
	public ResponseDTO deleteDefaultPage(@RequestBody FormDTO formDTO) {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Default page deleted successfully.",
				serviceAccess.formService.hideDefaultPage(formDTO), null);
	}
	@PostMapping(path = "/uploadFile")
	public ResponseDTO uploadFile(@RequestParam("encodedFileData") String file, @RequestParam("id")long formId, @RequestParam("type") String type) throws IOException {

		return new ResponseDTO(Constant.STATUS_CODE_201, "Question Background updated",serviceAccess.formService.storeBackgroundDetail(file,formId,type),null
		);
	}

	@PostMapping(path = "/saveTheme")
	public ResponseDTO SaveTheme(@RequestBody FormDTO formDTO) throws IOException {
		serviceAccess.formService.saveTheme(formDTO.getTheme());
		return new ResponseDTO(Constant.STATUS_CODE_201, "Theme Saved",serviceAccess.formService.SetTheme(formDTO),null
		);
	}

	@PostMapping(path = "/removeTheme")
	public ResponseDTO removeTheme(@RequestBody FormDTO formDTO) throws IOException {
		return new ResponseDTO(Constant.STATUS_CODE_201, "Theme Saved",serviceAccess.formService.removeTheme(formDTO),null
		);
	}

}
