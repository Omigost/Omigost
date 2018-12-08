package com.omigost.server.notification.slack;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.omigost.server.notification.NotificationMessage;

import java.util.LinkedList;
import java.util.List;

public class SlackMessage implements NotificationMessage {
    private static final String FALLBACK_TEXT = "Something went wrong...";
    private String mainText = "";
    private String attachmentText = "";
    private String callbackId = "";
    private List<SlackMessageAction> actions = new LinkedList<>();

    private SlackMessage() {}

    public String getMainText() {
        return mainText;
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

        return mapper.createArrayNode().add(attachment).toString();
    }

    public static class Builder implements NotificationMessage.Builder {
        private SlackMessage slackMessage = new SlackMessage();

        public SlackMessage build() {
            return slackMessage;
        }

        public Builder withMainText(String text) {
            slackMessage.mainText = text;
            return this;
        }

        public Builder withAttachmentText(String text) {
            slackMessage.attachmentText = text;
            return this;
        }

        public Builder withCallbackId(String callbackId) {
            slackMessage.callbackId = callbackId;
            return this;
        }

        public Builder addButton(String actionName, String text, String actionValue) {
            slackMessage.actions.add(new SlackMessageAction(actionName, text, "button", actionValue));
            return this;
        }
    }
}
