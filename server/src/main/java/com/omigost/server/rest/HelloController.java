package com.omigost.server.rest;

import com.omigost.server.iam.IAMService;
import com.omigost.server.model.AwsUser;
import com.omigost.server.slack.SlackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {
    @Autowired
    private SlackService slack;
    @Autowired
    private IAMService iam;

    @GetMapping("/hello")
    public void helloWorld() {
        slack.sendAlertToUser("Michał Ołtarzewski", "ALERT TEST");
    }

    @GetMapping("/users")
    public List<AwsUser> users() {
        return iam.users();
    }
}
