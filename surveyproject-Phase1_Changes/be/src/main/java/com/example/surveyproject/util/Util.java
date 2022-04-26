package com.example.surveyproject.util;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.sun.el.parser.ParseException;

import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

@Component
public class Util {

	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	@Qualifier("emailConfigBean")
	private Configuration emailConfig;

	@Value("${mail.from}")
	private String from;

	public static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MMM/yyyy");

	public void sendMail(EmailModel emailModel, String ftl) throws MessagingException, TemplateNotFoundException,
			MalformedTemplateNameException, ParseException, IOException, TemplateException {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message,
				MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
		Template template = emailConfig.getTemplate(ftl);
		String htmlString = FreeMarkerTemplateUtils.processTemplateIntoString(template, emailModel.getModel());
		mimeMessageHelper.setFrom(from);
		mimeMessageHelper.setTo(emailModel.getTo());
		mimeMessageHelper.setText(htmlString, true);
		mimeMessageHelper.setSubject(emailModel.getSubject());
		emailSender.send(message);
	}

}
