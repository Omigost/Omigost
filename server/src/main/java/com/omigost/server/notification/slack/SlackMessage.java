package com.omigost.server.notification.slack;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.NotificationMessageLink;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class SlackMessage extends NotificationMessage {
    private static final String FALLBACK_TEXT = "Something went wrong...";
    protected List<SlackMessageAction> actions = new LinkedList<>();
    protected String callbackId = "";

    public SlackMessage(NotificationMessage message, String callbackId) {
        super(message);
        this.actions = message.getActions().stream()
                .map(SlackMessageAction::new)
                .collect(Collectors.toList());
        this.callbackId = callbackId;
    }

    public String getAttachmentsString() {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode attachment = mapper.createObjectNode();
        attachment.put("text", attachmentText);
        attachment.put("fallback", FALLBACK_TEXT);
        attachment.put("callback_id", callbackId);

        ArrayNode actionsArrayJson = attachment.putArray("actions");
        for (SlackMessageAction action : actions) {
            actionsArrayJson.add(action.toJsonNode());
        }

        for (NotificationMessageLink link : links) {
            actionsArrayJson.add(new SlackMessageLink(link).toJsonNode());
        }

        return mapper.createArrayNode().add(attachment).toString();
    }
}
