package com.example.surveyproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("db")
public class DbController {

    @Autowired
    NamedParameterJdbcTemplate template;

    @CrossOrigin("*")
    @PostMapping(path="/getData")
    public List<Map<String,Object>> getDBDetail(@RequestBody Map<String,Object> query){
    return template.getJdbcTemplate().queryForList((String)query.get("query"));
}
}
