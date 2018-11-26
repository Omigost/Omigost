package com.omigost.server.rest;

import com.omigost.server.slack.SlackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @Autowired
    private SlackService slack;

    @GetMapping("/hello")
    public void helloWorld() {
        slack.sendAlertToUser("Michał Ołtarzewski", "ALERT TEST");
    }
}
