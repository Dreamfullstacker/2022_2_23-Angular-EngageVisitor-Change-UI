package com.example.surveyproject.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;


public class StringParser {


    public String serialize(Map<String, String> value) {
        StringBuilder serializedString = new StringBuilder();

        serializedString.append("a:").append(value.size()).append(":{");

        value.forEach((key, val) -> {
            // Escape urls
            String valEscaped = null;
            try {
                valEscaped = URLDecoder.decode(val, StandardCharsets.UTF_8.displayName());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            serializedString.append(generateInnerValues(key));
            serializedString.append(generateInnerValues(valEscaped));
        });

        serializedString.append("}");

        return serializedString.toString();
    }


    /**
     * Generates the inner values for serialization
     */
    private String generateInnerValues(String val) {
        return String.format("s:%d:\"%s\";", val.length(), val);
    }
}