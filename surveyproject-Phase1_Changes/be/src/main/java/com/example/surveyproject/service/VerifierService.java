package com.example.surveyproject.service;

import com.example.surveyproject.dto.UserDTO;
import com.example.surveyproject.model.CouponDetails;
import com.example.surveyproject.model.PaymentDetails;
import com.example.surveyproject.model.User;
import com.example.surveyproject.repository.RepositoryAccess;
import com.example.surveyproject.util.SecurityUtils;
import com.example.surveyproject.util.StringParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.time.LocalDate;
import java.util.TreeMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class VerifierService {

    @Autowired
    RepositoryAccess repositoryAccess;

    private final PublicKey publicKey;

    private final SecurityUtils securityUtils;
    private final StringParser stringParser;


    public VerifierService() {

        securityUtils = new SecurityUtils();
        stringParser = new StringParser();

        try {
            String publicKeyString="-----BEGIN PUBLIC KEY-----\n" +
                    "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwsWvAZs9lznQIeohBgUT\n" +
                    "1jjI6JIeoChC7ba2AmqXIRBS1dodysalZbph4gOKCJgp24V6ejFLAy/jjxuZVBkF\n" +
                    "f8Q3UFi7sNsPbzcqRa/NVVlj4bVHPaoCZ0B0b3fmZan/EBTkxO4lSZicsbPTMKoB\n" +
                    "jvZSIW8/3QZP8s5ZrNt0maIDbDlkqtyMfmoWWxfKE+/oeO2b7hUze9Tl5RAwWX97\n" +
                    "/g6K62rhL1xtueW4klvilfDa16fFF45ZEtPrDhfPhp6+F/JavnZektJtx4SaDuMf\n" +
                    "ig3inqhJo+NJqduA/aVR7MFauyuvz8I6muFKmk4Lv7j+Oxj5T2agP5IWSaV7ycsi\n" +
                    "F1mjtG//mlC07aH1wXNC1wjbWXUTFk/7/bFx+5YCn6Dhht4+bS6uLZHDXLtoS2Pw\n" +
                    "FlxIh4LgQMHiDFrBDvI8J7h0CLwPXDZLxEdI5cxPV05b3HPTQNqVYU9lcN5/9Mv3\n" +
                    "+MGWOjd6L+H0xPv9DMA3hz5hzW9O275l5+kmEiEtWY96nqmrNUYjJtkQvqpW4McR\n" +
                    "dKY0VASQlRj7YBiSm1JekWQCz7tww7fXzvzUwf0VKIsVmcGl1khjOTC1nwm3lJbI\n" +
                    "NiZMkcjPWleCof7wrP9474OGIJ5CSuwIu1Y6ROPZ4vPRCWfnULv1/LsD1empmvPa\n" +
                    "4d1EJwEbT65ScP7pXfFU7y0CAwEAAQ==\n" +
                    "-----END PUBLIC KEY-----";
            this.publicKey = securityUtils.getPublicKey(publicKeyString);
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Invalid Public Key Given");
        }
    }

    public boolean verifyDataWithSignature(String postBody) throws UnsupportedEncodingException {
        boolean isVerified = verifyInputData(postBody);

        if(!isVerified || !postBody.contains("p_signature")) {
            throw new IllegalArgumentException("The data supplied isn't a valid POST body.");
        }
        TreeMap<String, String> postData = getSortedMapFromBody(postBody);

        String serializedString = stringParser.serialize(postData);
        byte[] pSignatureEncoded = securityUtils.getEncodedPSignature(postData);
        postData.remove("p_signature");

        final ObjectMapper mapper = new ObjectMapper();
        final PaymentDetails paymentDetails = mapper.convertValue(postData, PaymentDetails.class);
        repositoryAccess.paymentRepository.save(paymentDetails);

        try {
            Signature signer = Signature.getInstance("SHA1withRSA");
            signer.initVerify(publicKey);
            signer.update(serializedString.getBytes());

            signer.verify(pSignatureEncoded);

            updatePaymentDetails(paymentDetails);
        } catch (Exception e) {
            isVerified = false;
            e.printStackTrace();
        }

        return isVerified;
    }
    private boolean verifyInputData(String data) {
        String regex = "&\\w+=";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(data);

        return matcher.find();
    }


    private TreeMap<String, String> getSortedMapFromBody(String data) {
        String[] split = data.split("&");
        TreeMap<String, String> ret = new TreeMap<>();

        for(String s : split) {
            String[] half = s.split("=", 2);
            ret.put(half[0], half[1]);
        }

        return ret;
    }

    private void updatePaymentDetails(PaymentDetails paymentDetails) throws BadPaddingException, InvalidAlgorithmParameterException, NoSuchAlgorithmException, IllegalBlockSizeException, NoSuchPaddingException, InvalidKeyException, InvalidKeySpecException {
       User user =  repositoryAccess.userRepository.findByEmail(paymentDetails.getEmail());
       user.setUserLicence(SecurityUtils.generateLicenceKey(paymentDetails, user.getId()));
       repositoryAccess.userRepository.save(user);

    }

    public PaymentDetails applyPromo (User user, CouponDetails coupon) throws InvalidAlgorithmParameterException, IllegalBlockSizeException, NoSuchPaddingException, InvalidKeySpecException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setCheckout_id("EV-"+coupon.getCouponCode());
        paymentDetails.setEmail(user.getEmail());
        if(coupon.getDuration() >0)
            paymentDetails.setNext_bill_date(""+LocalDate.now().plusDays(coupon.getDuration()));
        else
            paymentDetails.setNext_bill_date("N/A");
        paymentDetails.setAlertName("subscription_created");
        paymentDetails.setAlert_id(""+coupon.getId());
        paymentDetails.setEvent_time(LocalDate.now().toString());
        paymentDetails.setCurrency("");
        paymentDetails.setUnit_price("Free");

        return paymentDetails;
    }

    public void saveDetails(User user,PaymentDetails  paymentDetails,CouponDetails coupon) throws InvalidAlgorithmParameterException, IllegalBlockSizeException, NoSuchPaddingException, InvalidKeySpecException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        user.setUserLicence(SecurityUtils.generateLicenceKey(paymentDetails, user.getId()));
        repositoryAccess.paymentRepository.save(paymentDetails);
        coupon.setUsed(true);
        repositoryAccess.couponDetailsRepository.save(coupon);
    }
}