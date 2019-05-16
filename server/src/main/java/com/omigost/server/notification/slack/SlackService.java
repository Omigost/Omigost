package com.omigost.server.notification.slack;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.omigost.server.exception.BadServiceResponseException;
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
import org.springframework.web.server.ResponseStatusException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SlackService implements NotificationService {
    private static final String SLACK_API_URL = "https://slack.com/api/";
    private static final String USERS_LIST = "users.list";
    private static final String IM_OPEN = "conversations.open";
    private static final String CHAT_POST_MESSAGE = "chat.postMessage";

    @Value("${slack.oauth.bot.token}")
    private String authToken;

    private JsonNode getSlackBodyFrom(ResponseEntity<JsonNode> response) {
        JsonNode body = response.getBody();

        if (body == null) {
            throw new BadServiceResponseException("Null response from Slack API");
        }
        if (!body.get("ok").asBoolean()) {
            throw new ResponseStatusException(response.getStatusCode(),
                    "Slack API access failed, see these response details:\n" + body.toString()
            );
        }

        return body;
    }

    private ArrayNode getUsers() {
        String getUsersUrlWithAuth = SLACK_API_URL + USERS_LIST + "?token=" + authToken;
        ResponseEntity<JsonNode> response = new RestTemplate().getForEntity(
                getUsersUrlWithAuth,
                JsonNode.class);

        return (ArrayNode) getSlackBodyFrom(response).get("members");
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
        args.add("users", getUserId(username));

        ResponseEntity<JsonNode> response = new RestTemplate().postForEntity(
                SLACK_API_URL + IM_OPEN,
                args,
                JsonNode.class);

        return getSlackBodyFrom(response).get("channel").get("id").asText();
    }

    private String pullCallbackId() {
        return "42"; // TODO mock - not sure what the callback_id should be
    }

    public void sendMessageTo(Communication communication, NotificationMessage message) {
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
        log.info("[SLACK] Send message to user: ["+username+"]");

        MultiValueMap<String, String> args = getArgsMapWithAuth();
        args.add("channel", getConversationId(username));
        args.add("text", message.getMainText());
        args.add("attachments", message.getAttachmentsString());

        new RestTemplate().postForEntity(
                SLACK_API_URL + CHAT_POST_MESSAGE,
                args,
                JsonNode.class
        );
    }
}
