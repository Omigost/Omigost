package com.omigost.server.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.slack.SlackMessageAction;
import com.omigost.server.notification.slack.SlackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/slack")
public class SlackTestController {
    @Autowired
    private SlackService slack;

    @PostMapping("/sendMessage")
    public void sendMessage(@RequestParam String username) {
        slack.sendAlertToUser(username, "ALERT TEST");
    }

    @PostMapping("/sendMessageWithAttachment")
    public void sendMessageWithAttachment(@RequestParam String username) {
        NotificationMessage message = NotificationMessage.builder()
                .mainText("Hi!")
                .attachmentText("Do you wanna coffee?")
                .action(new SlackMessageAction("coffee", "YES", "yes"))
                .action(new SlackMessageAction("coffee", "NO", "no"))
                .build();
        slack.sendAlertToUser(username, message);
    }

    @PostMapping("/slackAction")
    public void handleSlackAction(@RequestParam String payload) throws IOException {
        JsonNode json = new ObjectMapper().readTree(payload);
        System.out.println(json.get("actions").get(0));
    }
}
