package com.omigost.server.notification.slack;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
                .put("name", this.text)
                .put("style", this.style);
    }
}
