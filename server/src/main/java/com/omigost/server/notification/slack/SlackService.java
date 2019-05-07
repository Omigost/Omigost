package com.omigost.server.notification.slack;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.omigost.server.exception.NotFoundException;
import com.omigost.server.model.Communication;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class SlackService implements NotificationService {
    private static final String SLACK_API_URL = "https://slack.com/api/";
    private static final String USERS_LIST = "users.list";
    private static final String IM_OPEN = "im.open";
    private static final String CHAT_POST_MESSAGE = "chat.postMessage";

    @Value("${slack.oauth.bot.token}")
    private String authToken;

    @Autowired
    private RestTemplate restTemplate;

    private ArrayNode getUsers() {
        ResponseEntity<JsonNode> response = restTemplate.postForEntity(
                SLACK_API_URL + USERS_LIST,
                getArgsMapWithAuth(),
                JsonNode.class);

        return (ArrayNode) response.getBody().get("members");
    }

    private String getUserId(String username) {
        for (JsonNode member : getUsers()) {
            if (username.equals(member.get("real_name").asText())) {
                return member.get("id").asText();
            }
        }

        throw new NotFoundException("Couldn't find user with such name");
    }

    private MultiValueMap<String, String> getArgsMapWithAuth() {
        MultiValueMap<String, String> argsMap = new LinkedMultiValueMap<>();
        argsMap.add("token", authToken);
        return argsMap;
    }

    private String getConversationId(String username) {
        MultiValueMap<String, String> args = getArgsMapWithAuth();
        args.add("user", getUserId(username));

        ResponseEntity<JsonNode> response = restTemplate.postForEntity(
                SLACK_API_URL + IM_OPEN,
                args,
                JsonNode.class);
        return response.getBody().get("channel").get("id").asText();
    }

    private String pullCallbackId() {
        return "42"; // TODO mock - not sure what the callback_id should be
    }

    public void sendAlertToUser(Communication communication, NotificationMessage message) {
        sendAlertToUser(communication.getValue(), new SlackMessage(message, pullCallbackId()));
    }

    public void sendAlertToUser(Communication communication, NotificationMessage message, String callbackId) {
        sendAlertToUser(communication.getValue(), new SlackMessage(message, callbackId));
    }

    public void sendAlertToUser(String username, String message) {
        sendAlertToUser(username, SlackMessage.builder().mainText(message).build());
    }

    public void sendAlertToUser(String username, NotificationMessage message) {
        sendAlertToUser(username, new SlackMessage(message, pullCallbackId()));
    }

    public void sendAlertToUser(String username, SlackMessage message) {
        MultiValueMap<String, String> args = getArgsMapWithAuth();
        args.add("channel", getConversationId(username));
        args.add("text", message.getMainText());
        args.add("attachments", message.getAttachmentsString());

        restTemplate.postForEntity(
                SLACK_API_URL + CHAT_POST_MESSAGE,
                args,
                JsonNode.class
        );
    }
}
