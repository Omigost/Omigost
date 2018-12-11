package com.omigost.server.rest;

import com.omigost.server.iam.IAMService;
import com.omigost.server.iam.model.AwsUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AWSTestController {
    @Autowired
    private IAMService iam;

    @GetMapping("/users")
    public List<AwsUser> users() {
        return iam.users();
    }
}
