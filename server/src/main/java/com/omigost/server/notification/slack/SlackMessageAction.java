package com.omigost.server.notification.slack;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.omigost.server.notification.NotificationMessageAction;

public class SlackMessageAction extends NotificationMessageAction {
    private String type = "button";

    public SlackMessageAction(String name, String text, String value, String type = ) {
        super (name, text, value);
    }

    public SlackMessageAction (NotificationMessageAction action) {
        super(action);
    }

    public JsonNode toJsonNode() {
        return new ObjectMapper()
                .setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
                .convertValue(this, JsonNode.class);
    }
}
