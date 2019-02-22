package com.omigost.server.notification.slack;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.NotificationMessageLink;

public class SlackMessageLink extends NotificationMessageLink {
    SlackMessageLink(NotificationMessageLink link) {
        super(link);
    }

    public JsonNode toJsonNode() {
        return new ObjectMapper().createObjectNode()
                .put("type",  "button")
                .put("text", this.text)
                .put("url", this.url)
                .put("style", this.style);
    }
}
