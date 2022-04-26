package com.example.surveyproject.util;

import com.example.surveyproject.model.CouponDetails;
import com.example.surveyproject.model.PaymentDetails;
import com.example.surveyproject.model.User;
import com.example.surveyproject.repository.RepositoryAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
@Component
public class SecurityUtils {

    private static RepositoryAccess repoAccess;

    public SecurityUtils(){

    }
    @Autowired
    private SecurityUtils(RepositoryAccess repoAccess) {
        SecurityUtils.repoAccess = repoAccess;
    }


    public PublicKey getPublicKey(String publicKeyString) throws InvalidKeySpecException {
        publicKeyString = publicKeyString
                .replace("-----BEGIN PUBLIC KEY-----\n", "")
                .replace("-----END PUBLIC KEY-----", "");

        try {
            byte[] byteKey = Base64.getMimeDecoder().decode(publicKeyString);
            X509EncodedKeySpec keySpecX509 = new X509EncodedKeySpec(byteKey);
            KeyFactory kf = KeyFactory.getInstance("RSA");

            return kf.generatePublic(keySpecX509);
        } catch (NoSuchAlgorithmException ignored) {
        }

        return null;
    }



    public byte[] getEncodedPSignature(SortedMap<String, String> postData) throws UnsupportedEncodingException {
        String pSignature = postData.get("p_signature");
        pSignature = URLDecoder.decode(pSignature, StandardCharsets.UTF_8.displayName());
        return Base64.getDecoder().decode(pSignature);
    }

    public static String generateLicenceKey(PaymentDetails payment,long userId) throws InvalidKeySpecException, NoSuchAlgorithmException, IllegalBlockSizeException, InvalidKeyException, BadPaddingException, InvalidAlgorithmParameterException, NoSuchPaddingException {
        String licenceKey = payment.getCheckout_id()+"_"+payment.getEmail()+"_"+payment.getNext_bill_date();
       return encrypt(licenceKey,getKeyFromPassword(""+userId,"eng@geV!s!tor"),generateIv());
    }

    public static boolean verifyLicence(User user){
       try {
           if(user.getUserLicence()==null ||user.getUserLicence().isEmpty())
               return  false;
           String decryptedLicenceKey = decrypt(user.getUserLicence(), getKeyFromPassword("" + user.getId(), "eng@geV!s!tor"), generateIv());
           List<String> licenceDetails = Arrays.asList(decryptedLicenceKey.split("_"));
           if(licenceDetails.get(0).startsWith("EV-")){
               String key = licenceDetails.get(0);
               return isValidCoupon(key.substring(3));
           }
           DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
           String nextDate = licenceDetails.get(2);
           LocalDate billingDate = LocalDate.parse(nextDate,dtf);
           return licenceDetails.get(1).equalsIgnoreCase(user.getEmail()) &&  LocalDate.now().isBefore(billingDate);
       }catch (Exception e){
           e.printStackTrace();
           return false;
       }

    }

    private static boolean isValidCoupon(String couponCode){
        Optional<CouponDetails> couponDetails = repoAccess.couponDetailsRepository.findByCouponCodeAndIsUsedAndIsActive(couponCode,true,true);
        return  couponDetails.isPresent();

    }
    private static String encrypt(String plainText, SecretKey key, IvParameterSpec iv)
            throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException,
            InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key,iv);
        return Base64.getEncoder()
                .encodeToString(cipher.doFinal(plainText.getBytes()));
    }

    private static String decrypt(String cipherText, SecretKey key, IvParameterSpec iv)
            throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException,
            InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
        cipher.init(Cipher.DECRYPT_MODE, key,iv);
        return new String(cipher.doFinal(Base64.getDecoder()
                .decode(cipherText)));
    }

    private static SecretKey getKeyFromPassword(String password, String salt)
            throws NoSuchAlgorithmException, InvalidKeySpecException {

        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt.getBytes(), 65536, 256);
        SecretKey secret = new SecretKeySpec(factory.generateSecret(spec)
                .getEncoded(), "AES");
        return secret;
    }

    public static IvParameterSpec generateIv() {
        byte[] iv = new byte[16];
        return new IvParameterSpec(iv);
    }


    public static void main(String[] args) throws InvalidKeySpecException, NoSuchAlgorithmException, IllegalBlockSizeException, InvalidKeyException, BadPaddingException, InvalidAlgorithmParameterException, NoSuchPaddingException {
       IvParameterSpec iv =generateIv();
        String encrypt = encrypt("test",getKeyFromPassword(""+1233,"eng@geV!s!tor"),new IvParameterSpec(new byte[16]));
        System.out.println(encrypt);
       String decrypt = decrypt(encrypt,getKeyFromPassword(""+1233,"eng@geV!s!tor"),new IvParameterSpec(new byte[16]));
    }



}