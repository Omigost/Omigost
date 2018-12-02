package com.omigost.server.slack;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

class SlackMessageAction {
    private String name, text, type, value;

    SlackMessageAction(String name, String text, String type, String value) {
        this.name = name;
        this.text = text;
        this.type = type;
        this.value = value;
    }

    JsonNode toJsonNode() {
        return new ObjectMapper()
                .setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
                .convertValue(this, JsonNode.class);
    }
}
